import categories from './categories'
import occasions from './occasions'
const faker = require('faker')

type Contact = {
  name: string
  phone: string | null
  email: string | null
}

type QuestionSeed = {
  food: {
    connect: { name: string }
  } | null
  occasion: {
    connect: { name: string }
  } | null
  location: string
  message: string
  contacts: Contact[]
}

const makeQuestions = async (num: number) => {
  const message =
    'Hi everyone,\n\nI’m asking people whose taste I trust to give me a recommendation using the BEST app.  \n\nJust click on the BEST button to give me your recommendation!'

  const result = []
  for (let i = 0; i < num; i++) {
    let randomNum = faker.datatype.number(categories.length - 1)
    let food = <any>{ connect: { name: categories[randomNum] } }

    randomNum = faker.datatype.number(3)
    let occasion = <any>{ connect: { name: occasions[randomNum] } }

    if (faker.datatype.boolean()) food = undefined
    else occasion = undefined

    const location = 'Buffalo, NY, USA'
    const placeId = 'ChIJoeXfUmES04kRcYEfGKUEI5g'
    const lat = 42.88644679999999
    const lng = -78.8783689

    let contacts = []
    for (let j = randomNum; j < 4; j++) {
      let contact = {
        name: faker.fake('{{name.firstName}} {{name.lastName}}'),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
      }
      contacts.push(contact)
    }

    const fakeQuestion = {
      food,
      occasion,
      message,
      location,
      contacts,
      placeId,
      lat,
      lng,
    }

    result.push(fakeQuestion)
  }
  return result
}

export default makeQuestions
