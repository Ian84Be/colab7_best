import React, { useEffect, useState } from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '../../lib/prisma'
import { useForm } from '../../hooks/useForm'
import styles from '../../styles/Form.module.css'
import homeIcon from '../../public/images/home_button.svg'
import FormStep1 from '../../components/FormStep1'
import FormStep2 from '../../components/FormStep2'
const localApi = 'http://localhost:3000/api/'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const foodData = await prisma.food.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  const occasionData = await prisma.occasion.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  const foodOptions = processData(foodData)
  const occasionOptions = processData(occasionData)
  return { props: { foodOptions, occasionOptions } }
}

function processData(feed) {
  let result = feed.map((f) => ({ key: f.id, text: f.name, value: f.name }))
  return result
}

export type FormData = {
  food: string
  occasion: string
  location: string
  contacts: Array<object>
}

const NewQuestion: NextPage<Props> = (props) => {
  const [formStep, setFormStep] = useState(1)
  const [myContacts, setMyContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async (): Promise<any> => {
      await fetch(localApi + 'getContacts', {
        method: 'GET',
      })
        .then(async (res) => {
          const response = await res.json()
          const result = response.contacts.map((c) => ({
            key: c.name + c.phone,
            text: c.name,
            value: c,
          }))
          setMyContacts(result)
        })
        .catch((err) => console.log(err))
    }
    fetchContacts()
  }, [])

  const formState = {
    food: '',
    occasion: '',
    location: '',
    contacts: [],
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

  const { formData, handleChange, handleSubmit, handleDropdown } = useForm(
    submitData,
    formState
  )
  // console.log('FORMDATA !(*!(*#!(*!(*', formData)

  const handleStepChange = (e) => {
    // console.log(e.target.innerText)
    e.preventDefault()
    if (e.target.innerText === 'Back') {
      if (formStep > 1) setFormStep(formStep - 1)
    }
    if (e.target.innerText === 'Next') {
      if (formStep < 2) setFormStep(formStep + 1)
    }
  }

  return (
    <div className={styles.content}>
      <form className={styles.form}>
        {formStep === 1 && (
          <FormStep1
            foodOptions={props.foodOptions}
            occasionOptions={props.occasionOptions}
            formData={formData}
            handleDropdown={handleDropdown}
            handleChange={handleChange}
          />
        )}
        {formStep === 2 && (
          <FormStep2
            formData={formData}
            handleDropdown={handleDropdown}
            myContacts={myContacts}
          />
        )}

        <div className={styles.formNav}>
          {formStep > 1 && (
            <button className={styles.back_button} onClick={handleStepChange}>
              Back
            </button>
          )}

          <button className={styles.next_button} onClick={handleStepChange}>
            Next
          </button>
        </div>
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
