import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from '../../hooks/useForm'
import styles from '../../styles/Form.module.css'
import homeIcon from '../../public/images/home_button.svg'

const NewQuestion: NextPage = () => {
  const thisAPI = 'http://localhost:3000/api/createQuestion'
  const formState = {
    food: '',
    occasion: '',
    location: '',
  }

  const submitData = async (): Promise<any> => {
    console.log({ formData })

    const response = await fetch(thisAPI, {
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
        <label htmlFor="food" className={styles.label}>
          <div className={styles.logoFont}>BEST</div> place for
        </label>
        <input
          autoComplete="food"
          className={styles.input}
          id="food"
          name="food"
          type="text"
          onChange={handleChange}
          placeholder="food"
          required
        />
        <label htmlFor="occasion" className={styles.label}>
          OR
        </label>
        <input
          autoComplete="occasion"
          className={styles.input}
          id="occasion"
          name="occasion"
          type="text"
          onChange={handleChange}
          placeholder="occasion"
          required
        />
        <label htmlFor="location" className={styles.label}>
          IN
        </label>
        <input
          autoComplete="location"
          className={styles.input}
          id="location"
          name="location"
          type="text"
          onChange={handleChange}
          placeholder="location"
          required
        />
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