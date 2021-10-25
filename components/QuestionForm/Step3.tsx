import React from 'react'
import styles from '../../styles/Form.module.css'
import { Input, TextArea } from 'semantic-ui-react'

const Step3: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <>
      <label htmlFor="message" className={styles.prompt}>
        How shall we put this?
      </label>
      <p className={styles.prompt_sub}>
        This is the standard message we send, but you can change it.
      </p>
      <TextArea
        className={styles.textArea}
        style={{
          border: '1px solid #05343a',
          fontSize: '16px',
          lineHeight: '20px',
        }}
        id="message"
        name="message"
        placeholder="message"
        type="text"
        rows="10"
        onChange={handleChange}
        value={formData.message}
      />
    </>
  )
}
export default Step3
