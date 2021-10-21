import NextAuth from 'next-auth'
import { NextApiHandler } from 'next'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import type { User, Session, NextAuthOptions } from 'next-auth'

const JWT_SECRET = String(process.env.NEXTAUTH_JWT_SECRET)
const googleScopes = [
  'profile',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/user.emails.read',
]
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
authUrl.searchParams.set('prompt', 'consent')
authUrl.searchParams.set('access_type', 'offline')
authUrl.searchParams.set('response_type', 'code')

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  secret: JWT_SECRET,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: authUrl.toString(),
      scope: googleScopes.join(' '),
    }),
  ],
  callbacks: {
    signIn: async (user: User, account, profile) => {
      // console.log('signIn callback!!', { user, account })
      const { provider, id, refresh_token, access_token } = account
      try {
        await prisma.account.update({
          where: {
            providerId_providerAccountId: {
              providerId: provider,
              providerAccountId: id,
            },
          },
          data: { accessToken: access_token, refreshToken: refresh_token },
        })
      } catch (err) {
        console.log(err)
      }

      const { email, verified_email } = profile
      if (verified_email) {
        try {
          //on first login the user record does not exist yet
          await prisma.user.update({
            where: { email },
            data: { emailVerified: verified_email },
          })
        } catch (err) {
          console.log(err)
        }
      }
      return true
    },
    session: async (session: Session, user: User) => {
      const updated = await prisma.account.findUnique({
        where: { id: user.id },
        select: { refreshToken: true, accessToken: true },
      })
      session.refreshToken = updated?.refreshToken
      session.accessToken = updated?.accessToken
      // console.log('session callback!!', { session, user })
      return Promise.resolve(session)
    },
  },
}
const AuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default AuthHandler
