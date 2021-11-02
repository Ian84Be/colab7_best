import React from 'react'
import Script from 'next/script'
import styles from '../../styles/Form.module.css'
import { Dropdown, Input } from 'semantic-ui-react'

export type FormProps = {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Step1: React.FC<Props> = ({
  foodOptions,
  occasionOptions,
  formData,
  handleDropdown,
  handleChange,
}) => {
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
      />
      <label htmlFor="food" className={styles.label}>
        What are you looking for?
      </label>
      <div className={styles.label}>
        <div className={styles.logoFont}>BEST</div> place for
      </div>
      <Dropdown
        id="food"
        name="food"
        placeholder="food"
        search
        selection
        style={{ marginBottom: '8px' }}
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
        style={{ marginBottom: '8px' }}
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
export default Step1
