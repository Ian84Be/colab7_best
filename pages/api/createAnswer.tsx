import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const { questionId, answer, comment, name } = req.body

  const newAnswer = await prisma.answer.create({
    data: {
      name,
      answer,
      comment,
      question: { connect: { id: Number(questionId) } },
    },
  })
  // console.log(newAnswer)

  const { contacts } = await prisma.question.findUnique({
    where: { id: questionId },
  })
  // console.log({ contacts, name })

  contacts.forEach((c) => {
    if (c.name === name) {
      c.answerId = newAnswer.id
    }
  })

  const updatedQuestion = await prisma.question.update({
    where: { id: questionId },
    data: {
      contacts,
    },
  })
  // console.log(updatedQuestion)
  // console.log(newAnswer)
  res.status(200).json({ data: newAnswer })
}
