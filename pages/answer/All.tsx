import type { NextPage, GetStaticProps } from 'next'
import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import BestLogo from '../../components/BestLogo'
import styles from '../../styles/Home.module.css'
import prisma from '../../lib/prisma'
import { signIn, signOut, useSession } from 'next-auth/client'
import Router from 'next/router'
import Answer, { AnswerProps } from '../../components/Answer'
import { Accordion } from 'semantic-ui-react'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.answer.findMany({
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
    },
  })
  console.log({ feed })
  return { props: { feed } }
}

type Props = {
  feed: AnswerProps[]
}

const AllAnswers: NextPage<Props> = (props) => {
  const [session, loading] = useSession()
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>BEST - All Answers</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.question_content}>
        <BestLogo size="small" />
        <Accordion fluid exclusive={false}>
          {props.feed.map((question) => (
            <Answer
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

export default AllAnswers
