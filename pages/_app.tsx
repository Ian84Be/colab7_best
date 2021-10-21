import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { Provider, useSession, signOut } from 'next-auth/client'
import '../styles/globals.scss'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [session, loading] = useSession()
  return (
    <Provider session={pageProps.session}>
      <div className={styles.container}>
        <Head>
          <title>BEST</title>
          <meta name="description" content="colab7_best" />
          <link rel="icon" href="/public/favicon.ico" />
          <link
            rel="preload"
            href="/public/fonts/FaceType-Moki-Mono.otf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <Component {...pageProps} />
      </div>
      <Link href="/question/New">
        <a>New Question</a>
      </Link>
      <Link href="/api/getContacts">
        <a>getContacts</a>
      </Link>
    </Provider>
  )
}
export default MyApp
