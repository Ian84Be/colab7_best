import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { useReducer } from 'react'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const { food, location } = req.body
  const session = await getSession({ req })

  const newQuestion = await prisma.question.create({
    data: {
      food,
      location,
      author: { connect: { email: session?.user?.email } },
    },
  })
  console.log(newQuestion)
  res.status(200).json({ data: newQuestion })
}
