import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import prisma from '../../lib/prisma'
import { signIn, signOut, useSession } from 'next-auth/client'
import Router from 'next/router'
import Question, { QuestionProps } from '../../components/Question'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.question.findMany({
    select: {
      id: true,
      food: true,
      location: true,
      author: {
        select: { name: true },
      },
    },
  })
  console.log({ feed })
  return { props: { feed } }
}

type Props = {
  feed: QuestionProps[]
}

const AllQuestions: NextPage<Props> = (props) => {
  const [session, loading] = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <title>BEST - All Questions</title>
        <meta name="description" content="colab7_best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainBG}>
        {loading && <p>loading...</p>}
        {!session && <div>need tolog in</div>}
        {session && (
          <>
            <p>signed in as {session.user?.name}</p>
            <button onClick={() => signOut()}>sign out</button>
          </>
        )}
        {props.feed.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </main>
    </div>
  )
}

export default AllQuestions
