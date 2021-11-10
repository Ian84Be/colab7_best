import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import homeIcon from '../public/images/home_button.svg'

const FooterNav = () => {
  const router = useRouter()
  const questionPage = router.pathname.match(/question/i)
  const responsePage = router.pathname.match(/response/)
  const rootPage = router.pathname === '/' ? true : false

  return (
    <nav className={styles.footer}>
      {rootPage ? (
        <Link href="/Responses">
          <a className={styles.footer_button}>Responses</a>
        </Link>
      ) : (
        <Link href="/">
          <a className={`${styles.footer_button} ${styles.footer_home_button}`}>
            <Image src={homeIcon} alt="Home" width={24} height={24} />
          </a>
        </Link>
      )}
      {questionPage || responsePage ? (
        <Link href="/Responses">
          <a className={styles.footer_button}>Responses</a>
        </Link>
      ) : (
        <Link href="/question/New">
          <a className={styles.footer_button}>New Question</a>
        </Link>
      )}
    </nav>
  )
}
export default FooterNav
