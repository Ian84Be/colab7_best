import React, { useState, useEffect } from 'react'
import { Dropdown, Checkbox, TextArea } from 'semantic-ui-react'
import { usePlacesAutocomplete } from '../../lib/googleAutocomplete'
import Image from 'next/image'
import Script from 'next/script'
import poweredByGoogleImage from '../../public/images/powered_by_google_on_non_white.png'
import styles from '../../styles/Form.module.css'

const Step1 = ({
  question,
  formData,
  handleChange,
  handleDropdown,
  handleSearchChange,
  searchTerm,
}) => {
  const { food, occasion, author, location, lat, lng } = question
  const predictions = usePlacesAutocomplete(searchTerm, ['establishment'], {
    lat,
    lng,
  })
  console.log({ formData, predictions })

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
      <p>Help {author?.name} out.</p>
      <div className={styles.label}>
        {`What's`} the <div className={styles.logoFont}>BEST</div> place for
      </div>
      <div className={styles.label}>
        {food ? food.name : occasion.name} in {location}?
      </div>
      <p>Not decent. Not really good.</p>
      <div className={styles.label}>
        The <div className={styles.logoFont}>BEST!</div>
      </div>

      <Dropdown
        id="answer"
        name="answer"
        placeholder="answer"
        search
        selection
        className={styles.input}
        onChange={handleDropdown}
        onSearchChange={handleSearchChange}
        options={locOptions}
        searchQuery={searchTerm}
        value={formData.answer}
      />
      <Image
        src={poweredByGoogleImage}
        alt="Powered by Google"
        width="144"
        height="18"
      />
      <Checkbox
        id="letMeKnow"
        name="letMeKnow"
        label="Let me know how everyone answers"
        onChange={handleChange}
        checked={formData.letMeKnow}
        className={styles.checkbox}
      />

      <label
        htmlFor="comment"
        className={styles.prompt}
        style={{ alignSelf: 'start' }}
      >
        Comment (optional)
      </label>
      <p
        className={styles.prompt_sub}
        style={{ margin: 0, alignSelf: 'start' }}
      >
        e.g. the BEST thing to order there
      </p>
      <TextArea
        className={styles.textArea}
        style={{
          border: '1px solid #05343a',
          fontSize: '16px',
          lineHeight: '20px',
        }}
        id="comment"
        name="comment"
        placeholder="comment"
        type="text"
        rows="4"
        onChange={handleChange}
        // value={formData.comment}
      />
    </>
  )
}
export default Step1
