import GoogleLogo from './GoogleLogo'
import styles from '../styles/Home.module.css'
import { signIn } from 'next-auth/client'

const SignInGoogleButton = () => {
  return (
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
  )
}
export default SignInGoogleButton
