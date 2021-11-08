import React from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import prisma from '../../lib/prisma'
import styles from '../../styles/Form.module.css'
import QuestionForm from '../../components/QuestionForm'
import FooterNav from '../../components/FooterNav'

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

const NewQuestion: NextPage<Props> = (props) => {
  return (
    <div className={styles.content}>
      <QuestionForm
        foodOptions={props.foodOptions}
        occasionOptions={props.occasionOptions}
      />
      <FooterNav />
    </div>
  )
}
export default NewQuestion
