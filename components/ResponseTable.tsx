import React, { useState } from 'react'
import Router from 'next/router'
import { Accordion } from 'semantic-ui-react'
import formStyles from '../styles/Form.module.css'
import styles from '../styles/Response.module.css'
import RankedResultCard from './RankedResultCard'
import { rank } from '../lib/helpers'

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

const ResponseTable: React.FC<{ question: QuestionProps }> = ({
  activeIndex,
  setActiveIndex,
  question,
}) => {
  const { id, food, occasion, location, answers } = question
  if (answers.length > 0) {
    const rankedResult = rank(answers)
    return (
      <>
        <Accordion.Title
          onClick={() => setActiveIndex(id)}
          className={formStyles.accordion_title}
        >
          <div className={formStyles.titleText}>
            For{' '}
            <strong className={formStyles.hilite}>
              {food?.name || occasion?.name}
            </strong>{' '}
            in <strong className={formStyles.location}>{location}</strong>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === id} style={{ padding: '0' }}>
          <div className={styles.responseContainer}>
            {rankedResult.map((a) => (
              <RankedResultCard key={a.name} answer={a} />
            ))}
          </div>
        </Accordion.Content>
      </>
    )
  } else return <></>
}

export default ResponseTable
