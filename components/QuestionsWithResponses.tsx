import React, { useState } from 'react'
import Router from 'next/router'
import { Accordion } from 'semantic-ui-react'
import styles from '../styles/Form.module.css'
import ResponseTable from './ResponseTable'

export type QuestionProps = {
  id: number
  food: {
    name: string
  } | null
  occasion: {
    name: string
  } | null
  message: string
  author: {
    name: string
    email: string
  } | null
  location: string
  answers: [
    {
      answer: string
      comment: string
    }
  ]
}

const QuestionsWithResponses: React.FC<{ question: QuestionProps }> = ({
  activeIndex,
  setActiveIndex,
  question,
}) => {
  const { id, food, occasion, location, answers } = question
  if (answers.length > 0) {
    return (
      <>
        <Accordion.Title
          onClick={() => setActiveIndex(id)}
          className={styles.accordion_title}
        >
          <div className={styles.titleText}>
            For{' '}
            <strong className={styles.hilite}>
              {food?.name || occasion?.name}
            </strong>{' '}
            in <strong className={styles.location}>{location}</strong>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === id} style={{ padding: '0' }}>
          <ResponseTable answers={answers} id={id} />
        </Accordion.Content>
      </>
    )
  } else return <></>
}

export default QuestionsWithResponses
