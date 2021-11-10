import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Form.module.css'

const Step4: React.FC<Props> = ({ questionId }) => {
  const router = useRouter()
  return (
    <>
      <label className={styles.prompt} style={{ marginTop: '150px' }}>
        Great! Your question has been sent!
      </label>
      <p
        className={styles.prompt}
        onClick={() =>
          router.push(
            `/response/${questionId}?name=${encodeURIComponent('Ian Belknap')}`
          )
        }
      >
        We’ll email you when the responses start coming in, or you can track
        them in Responses.
      </p>
    </>
  )
}
export default Step4
