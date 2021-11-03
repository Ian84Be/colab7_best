import { Prisma, PrismaClient } from '@prisma/client'
import categories from './categories'
import occasions from './occasions'
import makeQuestions from './questions'
import makeAnswers from './answers'
import axios from 'axios'

const prisma = new PrismaClient()

export const maxQuestions = 10

export const getFromYelp = async (query: string) => {
  const response = await axios
    .post(
      'https://api.yelp.com/v3/graphql',
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    )
    .then((res) => {
      // console.log(res)
      return res.data.data.search
    })
    .catch((err) => console.log(err))
  // console.log('getfromyelp response', response)
  // console.log('getfromyelp response', response.business[0])
  const result = response.business
  return result
}

const categoryData: Prisma.FoodCreateManyInput[] = categories.map((data) => ({
  name: data,
}))
const occasionData: Prisma.OccasionCreateManyInput[] = occasions.map(
  (data) => ({
    name: data,
  })
)

async function truncateTables() {
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
  console.log({ tableNames })
  for (const { tablename } of tableNames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        )
        console.log(`truncate ${tablename}`)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
async function resetSequences() {
  const sequenceNames = await prisma.$queryRaw<
    Array<{ relname: string }>
  >`SELECT c.relname FROM pg_class c WHERE c.relkind='S'`
  console.log({ sequenceNames })
  for (const { relname } of sequenceNames) {
    try {
      await prisma.$executeRawUnsafe(
        `ALTER SEQUENCE ${relname} RESTART WITH 1;`
      )
      console.log(`reset ${relname}`)
    } catch (err) {
      console.log(err)
    }
  }
}

async function main() {
  await truncateTables()
  await resetSequences()

  const questionData = await makeQuestions(maxQuestions)

  console.log(`seeding ${categories.length} foods...`)
  await prisma.food.createMany({ data: categoryData })

  console.log(`seeding ${occasions.length} occasions...`)
  await prisma.occasion.createMany({ data: occasionData })

  console.log(`seeding ${questionData.length} questions...`)
  // await prisma.question.createMany({ data: questionData })
  for (const data of questionData) {
    await prisma.question.create({ data })
  }

  const answerData = await makeAnswers(prisma)
  console.log(`seeding ${answerData.length} answers...`)
  for (const data of answerData) {
    await prisma.answer.create({ data })
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect())
