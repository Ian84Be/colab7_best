import React from 'react'
import styles from '../../styles/Form.module.css'
import { Dropdown } from 'semantic-ui-react'

const Step2: React.FC<Props> = ({ myContacts, formData, handleDropdown }) => {
  return (
    <>
      <label htmlFor="food" className={styles.prompt}>
        Who do you want to ask?
      </label>
      <p className={styles.prompt_sub}>
        enter as many of your Gmail contacts as you like
      </p>
      <Dropdown
        id="contacts"
        name="contacts"
        placeholder="contacts"
        fluid
        multiple
        search
        selection
        onChange={handleDropdown}
        options={myContacts}
        value={formData.contacts}
      />
    </>
  )
}
export default Step2
