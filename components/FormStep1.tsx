import React from 'react'
import styles from '../styles/Form.module.css'
import { FormData } from '../pages/question/New'
import { Dropdown, Input } from 'semantic-ui-react'
import { useForm } from '../hooks/useForm'

export type FormProps = {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const formState = {
  food: '',
  occasion: '',
  location: '',
  contacts: {},
}

const FormStep1: React.FC<Props> = ({
  foodOptions,
  occasionOptions,
  formData,
  handleDropdown,
  handleChange,
}) => {
  return (
    <>
      <p className={styles.prompt}>What are you looking for?</p>
      <label htmlFor="food" className={styles.label}>
        <div className={styles.logoFont}>BEST</div> place for
      </label>
      <Dropdown
        id="food"
        name="food"
        placeholder="food"
        search
        selection
        options={foodOptions}
        onChange={handleDropdown}
        value={formData.food}
      />
      <label htmlFor="occasion" className={styles.label}>
        OR
      </label>
      <Dropdown
        id="occasion"
        name="occasion"
        placeholder="occasion"
        search
        selection
        onChange={handleDropdown}
        options={occasionOptions}
        value={formData.occasion}
      />
      <label htmlFor="location" className={styles.label}>
        IN
      </label>
      <Input
        className={styles.input}
        id="location"
        name="location"
        type="text"
        onChange={handleChange}
        placeholder="location"
        value={formData.location}
      />
    </>
  )
}
export default FormStep1
