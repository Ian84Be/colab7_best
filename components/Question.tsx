import React from 'react'
import Router from 'next/router'

export type QuestionProps = {
  id: number
  food: string
  author: {
    name: string
    email: string
  } | null
  location: string
}

const Question: React.FC<{ question: QuestionProps }> = ({ question }) => {
  return (
    <div
      onClick={() => Router.push('/question/[id]', `/question/${question.id}`)}
    >
      <h2>{question.food}</h2>
      <small>by {question.author?.name}</small>
    </div>
  )
}

export default Question
