import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { Provider } from 'next-auth/client'
import '../styles/globals.scss'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <div className={styles.container}>
        <Head>
          <title>BEST</title>
          <meta name="description" content="colab7_best" />
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <link rel="preload" href="/fonts/FaceType-Moki-Mono.otf" as="font" />
        </Head>
        <Component {...pageProps} />
      </div>
      <Link href="/question/New">
        <a>New Question</a>
      </Link>
      -
      <Link href="/question/All">
        <a>All Question</a>
      </Link>
      -
      <Link href="/api/getContacts">
        <a>getContacts</a>
      </Link>
    </Provider>
  )
}
export default MyApp
