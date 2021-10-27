import React, { useState } from 'react'
import Router from 'next/router'
import { Accordion } from 'semantic-ui-react'
import styles from '../styles/Form.module.css'

export type AnswerProps = {
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
}

const Answer: React.FC<{ question: AnswerProps }> = ({
  activeIndex,
  setActiveIndex,
  question,
}) => {
  const { id, food, occasion, location } = question
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
      <Accordion.Content active={activeIndex === id}>
        <h2>{question.food?.name}</h2>
        <h3>{question.occasion?.name}</h3>
        <h4>{question.message}</h4>
        <small>by {question.author?.name}</small>
      </Accordion.Content>
    </>
  )
}

export default Answer
