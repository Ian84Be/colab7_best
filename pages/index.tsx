import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GoogleLogo from '../public/images/GoogleLogo'
import { signIn, signOut, useSession } from 'next-auth/client'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <title>BEST</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainBG}>
        <p className={styles.logoLetters}>
          BE
          <br />
          ST
        </p>
        <h1>
          Only your Friends.
          <br />
          Only their favorite places.
        </h1>

        <button
          className={styles.googleButton}
          onClick={() =>
            signIn('google', {
              callbackUrl: 'http://localhost:3000/question/new',
            })
          }
        >
          <GoogleLogo />
          <p style={{ marginLeft: '15px' }}>Sign In with Google</p>
        </button>
        <Link href="/question/New">
          <a>New Question</a>
        </Link>
      </main>
    </div>
  )
}

export default Home
