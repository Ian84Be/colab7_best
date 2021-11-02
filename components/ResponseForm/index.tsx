import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useForm } from '../../lib/useForm'
import styles from '../../styles/Form.module.css'
import SignInGoogleButton from '../SignInGoogleButton'
import Step1 from './Step1'

export type FormData = {
  answer: string
  comment: string
  letMeKnow: boolean
}

const AnswerForm: React.FC<Props> = ({ question, name }) => {
  const localApi = 'http://localhost:3000/api/'
  const [formStep, setFormStep] = useState(1)
  // console.log({ question, name })

  const formState = {
    answer: '',
    comment: '',
    letMeKnow: false,
    questionId: question.id,
    name,
  }

  const submitData = async (): Promise<any> => {
    console.log('submitData()', formData)

    const response = await fetch(localApi + 'createAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res)
        setFormStep(2)
        return res.json()
      })
      .catch((err) => console.log({ err }))

    console.log('submitData() response', response)
  }

  const { formData, handleChange, handleDropdown, handleSubmit } = useForm(
    submitData,
    formState
  )

  return (
    <div className={styles.content} style={{ justifyContent: 'center' }}>
      <Form
        className={styles.form}
        style={{ height: '75%', textAlign: 'center' }}
      >
        {formStep === 1 && (
          <Step1
            formData={formData}
            handleChange={handleChange}
            question={question}
          />
        )}
        {formStep === 2 && (
          <>
            <p className={styles.label}>Thanks!</p>
            <p className={styles.label} style={{ marginBottom: '32px' }}>
              Your recommendation has been sent
            </p>
            <div
              className={styles.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '56px',
              }}
            >
              Create an account to get recommendations <br />
              from people you trust
              <div>
                and start experiencing the
                <strong className={styles.logoFont}>BEST!</strong>
              </div>
            </div>
            <SignInGoogleButton />
          </>
        )}
      </Form>
      <div className={styles.formNav}>
        {formStep === 1 && (
          <button className={styles.next_button} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default AnswerForm
