import { maxQuestions } from './index'
const faker = require('faker')

const makeAnswers = () => {
  const comment = 'o ya the best'

  const result = []
  for (let i = 0; i < maxQuestions; i++) {
    let randomNum = faker.datatype.number(maxQuestions - 1) + 1 //avoid zeroes
    let question = { connect: { id: randomNum } }
    let answer = faker.random.words(2)

    const fakeData = {
      answer,
      comment,
      question,
    }

    result.push(fakeData)
  }
  return result
}

export default makeAnswers
