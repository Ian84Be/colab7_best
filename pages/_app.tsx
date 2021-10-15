import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import styles from '../styles/Home.module.css'



function MyApp({ Component, pageProps }: AppProps) {
  return (
		<div className={styles.container}>
			<link
				rel="preload"
				href="/public/fonts/FaceType-Moki-Mono.otf"
				as="font"
				crossOrigin=""
			/>
			<Component {...pageProps} />
		</div>
	)
}
export default MyApp
