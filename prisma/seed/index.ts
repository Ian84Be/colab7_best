import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import categories from './categories'
import occasions from './occasions'

const categoryData: Prisma.FoodCreateInput[] = categories.map((data) => ({
  name: data,
}))
const occasionData: Prisma.OccasionCreateInput[] = occasions.map((data) => ({
  name: data,
}))

async function truncateTables() {
  const tableNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
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

async function main() {
  await truncateTables()
  console.log(`seeding ${categories.length} foods...`)
  for (const data of categoryData) {
    await prisma.food.create({ data })
  }

  console.log(`seeding ${occasions.length} occasions...`)
  for (const data of occasionData) {
    await prisma.occasion.create({ data })
  }
}

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect())
