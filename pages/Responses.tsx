import type { NextPage, GetStaticProps } from 'next'
import React, { useState } from 'react'
import Head from 'next/head'
import BestLogo from '../components/BestLogo'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'
import { signIn, signOut, useSession } from 'next-auth/client'
import Question, { QuestionProps } from '../components/QuestionsWithResponses'
import { Accordion } from 'semantic-ui-react'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.question.findMany({
    select: {
      id: true,
      food: {
        select: { name: true },
      },
      occasion: {
        select: { name: true },
      },
      location: true,
      message: true,
      author: {
        select: { name: true },
      },
      answers: {
        select: {
          answer: true,
          comment: true,
          id: true,
        },
      },
    },
  })
  // console.log({ feed })
  return { props: { feed } }
}

type Props = {
  feed: QuestionProps[]
}

const Responses: NextPage<Props> = (props) => {
  const [session, loading] = useSession()
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>BEST - All Questions</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.question_content}>
        <BestLogo size="small" />
        <Accordion fluid exclusive={false}>
          {props.feed.map((question) => (
            <Question
              key={question.id}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              question={question}
            />
          ))}
        </Accordion>
      </main>
    </div>
  )
}

export default Responses