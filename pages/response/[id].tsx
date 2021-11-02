import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import AnswerForm from '../../components/ResponseForm'
import { QuestionProps } from '../../components/QuestionsWithResponses'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
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
    },
  })
  // console.log('getServerSideProps question', question)
  console.log('getServerSideProps query', query)
  const { name } = query
  return { props: { question, name } }
}

const View: React.FC<QuestionProps> = ({ question, name }) => {
  return <AnswerForm question={question} name={name} />
}

export default View
