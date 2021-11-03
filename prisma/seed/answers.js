import { maxQuestions, getFromYelp } from './index'
const faker = require('faker')

const makeAnswers = async (prisma) => {
  const comment = 'seed'

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
        lat: true,
        lng: true,
      },
    })
    // console.log({ questionInfo })
    randomNum = faker.datatype.number(questionInfo.contacts.length - 1)
    let { name } = questionInfo.contacts[randomNum]

    let term = questionInfo.food
      ? questionInfo.food.name
      : questionInfo.occasion.name

    // const query = `query searchByTermUSA {
    // 		search(term: "${term}", location: "usa", limit: 1) {
    // 			business {
    // 				name
    // 				id
    // 				coordinates{
    // 					latitude
    // 					longitude
    // 				}
    // 			}
    // 		}
    // 	}`

    const query = `query searchByLatLng {
    	search(term: "${term}", latitude: ${questionInfo.lat}, longitude:${questionInfo.lng}, radius: 20000 limit: 5) {
    		business {
    			name
    			id
    			coordinates{
    				latitude
    				longitude
    			}
    		}
    	}
    }`
    let answer = await getFromYelp(query)
    // console.log({ answer })
    randomNum = faker.datatype.number(answer.length - 1)
    const randomAnswer = answer[randomNum]

    const fakeData = {
      answer: randomAnswer.name,
      yelpId: randomAnswer.id,
      lat: randomAnswer.coordinates.latitude,
      lng: randomAnswer.coordinates.longitude,
      comment,
      question,
      name,
    }

    result.push(fakeData)
  }
  return result
}

export default makeAnswers
