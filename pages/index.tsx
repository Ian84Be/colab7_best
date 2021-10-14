import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BEST</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
					ask a <Link href="/Question"><a>Question</a></Link>
        </h1>
      </main>

    </div>
  )
}

export default Home
