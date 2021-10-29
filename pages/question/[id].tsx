import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Question, {
  QuestionProps,
} from '../../components/QuestionsWithResponses'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const question = await prisma.question.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      id: true,
      food: { select: { name: true } },
      occasion: { select: { name: true } },
      author: { select: { name: true } },
      location: true,
      message: true,
      answers: {
        select: {
          answer: true,
          comment: true,
          id: true,
        },
      },
    },
  })
  console.log('getServerSideProps question', question)
  return { props: { question } }
}

const View: React.FC<QuestionProps> = ({ question }) => {
  return <Question question={question} />
}

export default View
