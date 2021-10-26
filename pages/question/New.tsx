import React from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import prisma from '../../lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Form.module.css'
import homeIcon from '../../public/images/home_button.svg'
import QuestionForm from '../../components/QuestionForm'

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
