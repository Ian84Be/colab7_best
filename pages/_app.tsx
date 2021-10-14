import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import styles from '../styles/Home.module.css'



function MyApp({ Component, pageProps }: AppProps) {
  return (
		<div className={styles.container}>
			<Component {...pageProps} />
		</div>
	)
}
export default MyApp
