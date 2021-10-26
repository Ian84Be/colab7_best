import React from 'react'
import styles from '../../styles/Form.module.css'
import { Input, TextArea } from 'semantic-ui-react'

const Step4: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <>
      <label className={styles.prompt} style={{ marginTop: '150px' }}>
        Great! Your question has been sent!
      </label>
      <p className={styles.prompt}>
        We’ll email you when the responses start coming in, or you can track
        them in Responses.
      </p>
    </>
  )
}
export default Step4
