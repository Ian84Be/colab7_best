import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GoogleLogo from '../components/GoogleLogo'
import BestLogo from '../components/BestLogo'
import { signIn, signOut, useSession } from 'next-auth/client'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  return (
    <div className={styles.container}>
      <main className={styles.mainBG}>
        <BestLogo />
        <h1 style={{ fontFamily: 'Mulish, sans-serif' }}>
          Only your Friends.
          <br />
          Only their favorite places.
        </h1>

        <button
          className={styles.googleButton}
          onClick={() =>
            signIn('google', {
              callbackUrl: 'http://localhost:3000/question/New',
            })
          }
        >
          <GoogleLogo />
          <p style={{ marginLeft: '15px' }}>Sign In with Google</p>
        </button>
      </main>

      {loading && <p>loading...</p>}
      {!session && <div>need tolog in</div>}
      {session && (
        <>
          <p>signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>sign out</button>
        </>
      )}
    </div>
  )
}

export default Home
