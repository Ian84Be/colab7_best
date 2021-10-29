import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import styles from '../../styles/Answer.module.css'
import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { best } = query
  const answers = await prisma.answer.findMany({
    where: {
      questionId: Number(params?.id) || -1,
      answer: best,
    },
    select: {
      id: true,
      name: true,
      answer: true,
      yelpId: true,
      comment: true,
    },
  })
  // console.log('answers[0].yelpId', answers[0].yelpId)
  const yelpQuery = {
    query: `{
			business(id: "${answers[0].yelpId}") {
				name
				display_phone
				location {
					formatted_address
				}
				photos
				url
				hours {
					open {
						day
						start
						end
					}
				}
			}
		}
		`,
    variables: {},
  }

  let { data } = await fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
    body: JSON.stringify(yelpQuery),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => console.log(err))
  const yelpData = data.business
  console.log('yelpData.business[0]', yelpData)
  // console.log('yelpData.business[0]', yelpData.business[0])
  // console.log('getServerSideProps answers', answers)
  // console.log('getServerSideProps answers', answers[0].yelpId)

  // console.log('getServerSideProps query', query)

  return { props: { answers, best, yelpData } }
}

const View: React.FC<Props> = ({ answers, best, yelpData }) => {
  // console.log({ answers })
  const { display_phone, location, photos, url, hours } = yelpData
  return (
    <div className="BestView">
      <header className={styles.answer_title}>{best}</header>
      <Image src={photos[0]} alt={best} width="178px" height="112px" />
      <div>
        <p>{location.formatted_address}</p>
        <p>{display_phone}</p>
      </div>
      <section>
        {answers.map((a) => {
          console.log(a)
          return <div key={a.id}>{a.name}</div>
        })}
      </section>
    </div>
  )
}

export default View
