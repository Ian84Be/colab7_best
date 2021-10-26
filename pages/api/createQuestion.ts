import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { useReducer } from 'react'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body)
  const { food, occasion, location, message, contacts } = req.body
  const session = await getSession({ req })
  // console.log('createQuestion API session ***', session)
  const data = {
    location,
    message,
    contacts,
    author: { connect: { email: session?.user?.email } },
  }

  if (food) data.food = { connect: { name: food } }
  if (occasion) data.occasion = { connect: { name: occasion } }

  const newQuestion = await prisma.question.create({
    data,
  })
  // console.log(newQuestion)
  res.status(200).json({ data: newQuestion })
}
