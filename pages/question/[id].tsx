import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Question, { QuestionProps } from '../../components/Question'
import { AppProps } from 'next/dist/shared/lib/router/router'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const question = await prisma.question.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      createdAt: false,
      food: true,
      location: true,
      author: { select: { name: true } },
    },
  })
  console.log('getServerSideProps question', question)
  return { props: { question } }
}

const Post: React.FC<QuestionProps> = ({ question }) => {
  return <Question question={question} />
}

export default Post
