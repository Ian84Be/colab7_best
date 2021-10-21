import React, { useEffect, useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from '../../hooks/useForm'
import styles from '../../styles/Form.module.css'
import homeIcon from '../../public/images/home_button.svg'
import FormStep1 from '../../components/FormStep1'
import FormStep2 from '../../components/FormStep2'

export type FormData = {
  food: string
  occasion: string
  location: string
  contacts: string
}

const NewQuestion: NextPage = () => {
  const localApi = 'http://localhost:3000/api/'
  const [formStep, setFormStep] = useState(1)
  const formState = {
    food: '',
    occasion: '',
    location: '',
    contacts: {},
  }

  const submitData = async (): Promise<any> => {
    console.log({ formData })

    const response = await fetch(localApi + 'createQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch((err) => console.log({ err }))

    console.log('submitData() response', response)
  }

  const { formData, handleChange, handleSubmit } = useForm(
    submitData,
    formState
  )

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {formStep === 1 && (
          <FormStep1 formData={formData} handleChange={handleChange} />
        )}
        {formStep === 2 && (
          <FormStep2 formData={formData} handleChange={handleChange} />
        )}

        <button type="submit" className={styles.submit_button}>
          Next
        </button>
      </form>

      <footer className={styles.footer}>
        <Link href="/">
          <a className={styles.footer_button}>
            <Image src={homeIcon} alt="Home" width={24} height={24} />
          </a>
        </Link>

        <Link href="/">
          <a className={styles.footer_button}>Responses</a>
        </Link>
      </footer>
    </div>
  )
}
export default NewQuestion
