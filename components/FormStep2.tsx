import React, { useEffect, useState } from 'react'
import styles from '../styles/Form.module.css'
import { FormData } from '../pages/question/New'
import { Dropdown } from 'semantic-ui-react'
import { useForm } from '../hooks/useForm'
const localApi = 'http://localhost:3000/api/'

const FormStep2: React.FC<Props> = ({
  myContacts,
  formData,
  handleDropdown,
}) => {
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
export default FormStep2
