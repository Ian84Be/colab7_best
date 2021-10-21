import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { google } from 'googleapis'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req })
  if (!session) res.status(401)
  // console.log('getContacts *** ', { session })

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const accessToken = session?.accessToken
  const refreshToken = session?.refreshToken

  try {
    const auth = new google.auth.OAuth2({ clientId, clientSecret })
    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
    // const { tokens } = await auth.getToken(accessToken)
    // auth.credentials = tokens

    const people = await google.people({ auth, version: 'v1' })
    const { data } = await people.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,phoneNumbers',
      pageSize: '1000',
    })

    let result = []
    data.connections?.forEach((contact) => {
      let res = {}
      const name = contact.names || null
      if (name) res.name = name[0].displayName
      const email = contact.emailAddresses || null
      if (email) res.email = email[0].value
      const phone = contact.phoneNumbers || null
      if (phone) res.phone = phone[0].value
      if (email || phone) result.push(res)
    })

    res.status(200).json({ contacts: result, data: data.connections })
    // res.status(200)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
}

export default handler
