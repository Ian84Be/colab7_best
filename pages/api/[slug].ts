import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string }
  res.send(slug)
  // res.status(200).json(slug)
}

export default handler
