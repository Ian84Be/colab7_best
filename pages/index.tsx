import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import BestLogo from '../components/BestLogo'
import { signIn, signOut, useSession } from 'next-auth/client'
import SignInGoogleButton from '../components/SignInGoogleButton'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  return (
    <div className={styles.container}>
      <main className={styles.mainBG}>
        <BestLogo size="big" />
        <h1
          style={{
            fontFamily: 'Mulish, sans-serif',
            fontSize: '22px',
            lineHeight: '32px',
            marginBottom: '91px',
          }}
        >
          Only your Friends.
          <br />
          Only their favorite places.
        </h1>

        <SignInGoogleButton />
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
