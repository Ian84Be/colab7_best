import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import { useForm } from '../../hooks/useForm'
import styles from '../../styles/Form.module.css'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Progress from './Progress'

export type FormData = {
  food: string
  occasion: string
  location: string
  contacts: Array<object>
}

const QuestionForm: React.FC<Props> = (props) => {
  const localApi = 'http://localhost:3000/api/'
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

  const defaultMessage =
    'Hi everyone,\n\nI’m asking people whose taste I trust to give me a recommendation using the BEST app.  This question is open for 2 days, and I’d really appreciate your input.\n\nJust click on the BEST button to give me your recommendation!'

  const formState = {
    food: '',
    occasion: '',
    location: '',
    contacts: [],
    message: defaultMessage,
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

  const { formData, handleChange, handleDropdown, handleSubmit } = useForm(
    submitData,
    formState
  )

  const handleStepChange = (e) => {
    // console.log(e.target.innerText)
    e.preventDefault()
    if (e.target.innerText === 'Back') {
      if (formStep > 1) setFormStep(formStep - 1)
    }
    if (e.target.innerText === 'Next') {
      if (formStep < 3) setFormStep(formStep + 1)
    }
  }

  return (
    <div className={styles.content}>
      <Progress formStep={formStep} />
      <Form className={styles.form}>
        {formStep === 1 && (
          <Step1
            foodOptions={props.foodOptions}
            occasionOptions={props.occasionOptions}
            formData={formData}
            handleDropdown={handleDropdown}
            handleChange={handleChange}
          />
        )}
        {formStep === 2 && (
          <Step2
            formData={formData}
            handleDropdown={handleDropdown}
            myContacts={myContacts}
          />
        )}
        {formStep === 3 && (
          <Step3 formData={formData} handleChange={handleChange} />
        )}
      </Form>
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
    </div>
  )
}
export default QuestionForm
