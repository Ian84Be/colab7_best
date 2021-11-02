import { maxQuestions } from './index'
const axios = require('axios')
const faker = require('faker')

const getFromYelp = async (term, location) => {
  const response = await axios
    .post(
      'https://api.yelp.com/v3/graphql',
      {
        query: `{
					search(term: "${term}", location: "usa", limit: 1) {
						business {
							name
							id
							coordinates{
								latitude
								longitude
							}
						}
					}
				}`,
      },
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
  const result = response.business[0]
  return result
}

const makeAnswers = async (prisma) => {
  const comment = 'o ya the best'

  const result = []
  for (let i = 0; i < maxQuestions; i++) {
    let randomNum = faker.datatype.number(maxQuestions - 8) + 1 //avoid zeroes
    let question = { connect: { id: randomNum } }

    let questionInfo = await prisma.question.findUnique({
      where: { id: randomNum },
      select: {
        food: { select: { name: true } },
        occasion: { select: { name: true } },
        location: true,
        contacts: true,
      },
    })
    // console.log(questionInfo.contacts)
    randomNum = faker.datatype.number(questionInfo.contacts.length - 1)
    let { name } = questionInfo.contacts[randomNum]

    let term = questionInfo.food
      ? questionInfo.food.name
      : questionInfo.occasion.name

    let answer = await getFromYelp(term, questionInfo.location)
    // console.log({ answer })

    const fakeData = {
      answer: answer.name,
      yelpId: answer.id,
      lat: answer.coordinates.latitude.toString(),
      lng: answer.coordinates.longitude.toString(),
      comment,
      question,
      name,
    }

    result.push(fakeData)
  }
  return result
}

export default makeAnswers
