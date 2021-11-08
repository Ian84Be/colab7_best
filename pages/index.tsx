import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BestLogo from '../components/Icons/BestLogo'
import { signIn, signOut, useSession } from 'next-auth/client'
import SignInGoogleButton from '../components/SignInGoogleButton'
import { Loader } from 'semantic-ui-react'
import FooterNav from '../components/FooterNav'

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

        {loading && <Loader />}
        {!session && <SignInGoogleButton />}
      </main>
      {session && <FooterNav />}
    </div>
  )
}

export default Home
