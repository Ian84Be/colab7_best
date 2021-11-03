import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import styles from '../../styles/Form.module.css'
import { Dropdown } from 'semantic-ui-react'
import { usePlacesAutocomplete } from '../../lib/googleAutocomplete'
import poweredByGoogleImage from '../../public/images/powered_by_google_on_non_white.png'

export type FormProps = {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Step1: React.FC<Props> = ({
  foodOptions,
  occasionOptions,
  formData,
  handleDropdown,
  searchTerm,
  handleSearchChange,
}) => {
  const predictions = usePlacesAutocomplete(searchTerm)
  // console.log({ formData, predictions })
  // console.log('formData.location', formData.location)

  const [locOptions, setLocOptions] = useState([])

  useEffect(() => {
    if (predictions?.length > 0) {
      const data = predictions.map((p) => ({
        key: p.place_id,
        text: p.description,
        value: `${p.description}|${p.place_id}`,
      }))
      setLocOptions(data)
    }
  }, [predictions])

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
      <Dropdown
        className={styles.input}
        id="location"
        name="location"
        placeholder="location"
        search
        selection
        onChange={handleDropdown}
        onSearchChange={handleSearchChange}
        options={locOptions}
        searchQuery={searchTerm}
        value={formData.location}
      />
      <Image
        src={poweredByGoogleImage}
        alt="Powered by Google"
        width="144"
        height="18"
      />
    </>
  )
}
export default Step1
