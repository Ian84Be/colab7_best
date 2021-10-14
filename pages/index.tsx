import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import logoText from '../public/images/BESTlogoText.png'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BEST</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

			
      <main className={styles.mainBG}>
				<Image src={logoText} alt="BEST" />
        <h1>
					Only your Friends.<br/>
					Only their favorite places.
        </h1>

        <h2>
					ask a <Link href="/Question"><a>Question</a></Link>
        </h2>
      </main>

    </div>
  )
}

export default Home
