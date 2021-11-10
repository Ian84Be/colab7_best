import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import prisma from '../../lib/prisma'
import styles from '../../styles/Answer.module.css'
import formStyles from '../../styles/Form.module.css'
import Image from 'next/image'
import { Accordion, Icon } from 'semantic-ui-react'
import {
  businessFieldsFragment,
  dayNames,
  displayTime,
} from '../../lib/helpers'
import Chevron from '../../components/Icons/Chevron'
import FooterNav from '../../components/FooterNav'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { best } = query
  console.log({ query, params })
  const answers = await prisma.answer.findMany({
    where: {
      questionId: Number(params?.questionId) || -1,
      answer: best,
    },
    select: {
      id: true,
      questionId: true,
      name: true,
      answer: true,
      yelpId: true,
      lat: true,
      lng: true,
      comment: true,
    },
  })
  console.log('answers[0]', answers[0])
  const { yelpId, lat, lng } = answers[0]
  const yelpSearchQuery = `query searchByTerm {
		search(latitude: ${lat}, longitude:${lng},  radius: 20, limit: 1) {
			business {
				...businessFields
			}
		}
	}`
  const yelpIdQuery = `query findById {
			business(id: "${yelpId}") {
				...businessFields
			}
		}
		`

  let yelpQuery = yelpId ? yelpIdQuery : yelpSearchQuery
  yelpQuery = yelpQuery + businessFieldsFragment

  let yelpResponse = await fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
    body: JSON.stringify({ query: yelpQuery }),
  })
    .then(async (res) => {
      res = await res.json()
      console.log(res)
      return res
    })
    .catch((err) => console.log(err))
  const yelpData = yelpId
    ? yelpResponse.data.business
    : yelpResponse.data.search.business[0]
  // console.log('yelpData', yelpData)
  // console.log('yelpData.business[0]', yelpData.business[0])
  // console.log('getServerSideProps answers', answers)
  // console.log('getServerSideProps answers', answers[0].yelpId)

  // console.log('getServerSideProps query', query)

  return { props: { answers, best, yelpData } }
}

const View: React.FC<Props> = ({ answers, best, yelpData }) => {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(false)
  const { display_phone, location, photos, url, hours } = yelpData
  const { questionId, lat, lng } = answers[0]
  console.log({ questionId, lat, lng, hours })

  //yelp serves monday-sunday, but javascript date runs sunday-monday
  let dayNum = new Date().getDay()
  if (dayNum === 0) dayNum = 6
  else dayNum -= 1

  return (
    <div className={styles.answer_content}>
      <header className={styles.answer_header}>
        <Link href="/Responses">
          <a>
            <Chevron rotate={90} />
          </a>
        </Link>
        <div
          className={styles.answer_title}
          onClick={() =>
            router.push(
              `/response/${questionId}?name=${encodeURIComponent(
                'Ian Belknap'
              )}`
            )
          }
        >
          {best}
        </div>
      </header>
      <Image
        src={photos[0]}
        alt={best}
        width="178px"
        height="112px"
        className={styles.image}
      />

      <div className={styles.contactInfo}>
        <p
          style={{ marginBottom: '0' }}
          onClick={() =>
            router.push(`/map/${questionId}?lat=${lat}&lng=${lng}`)
          }
        >
          {location.address1}
          <br />
          {location.city}, {location.state} {location.postal_code}
        </p>
        <p>{display_phone}</p>
      </div>

      <Accordion fluid>
        <Accordion.Title
          onClick={() => setActiveIndex(!activeIndex)}
          className={formStyles.accordion_title}
          style={{ padding: 0 }}
        >
          <div className={styles.hours_row}>
            <p className={styles.hours_day}>{dayNames[dayNum]}</p>
            {hours[0].open[dayNum].start === '0000' &&
            hours[0].open[dayNum].end === '0000'
              ? 'Open 24 Hours'
              : `${displayTime(hours[0].open[dayNum].start)} -
							${displayTime(hours[0].open[dayNum].end)}`}
          </div>
          <Chevron rotate={activeIndex ? 180 : 0} />
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex}
          style={{ padding: '0', margin: '16px 0 16px' }}
        >
          {hours[0].open.map((day) => {
            return (
              <div className={styles.hours_row_expand} key={day.day}>
                <p className={styles.hours_day}>{dayNames[day.day]}</p>
                <p className={styles.hours_time}>
                  {day.start === '0000' && day.end === '0000'
                    ? 'Open 24 Hours'
                    : `${displayTime(day.start)} - ${displayTime(day.end)}`}
                </p>
              </div>
            )
          })}
        </Accordion.Content>
      </Accordion>

      <section className={styles.votedSection}>
        <div className={formStyles.titleText}>
          Voted
          <strong className={formStyles.logoFont}>BEST</strong>by:
        </div>

        {answers.map((a) => {
          console.log(a)
          return (
            <div className={styles.voteName} key={a.id}>
              {a.name} {a.comment && <Icon name="file alternate outline" />}
            </div>
          )
        })}
      </section>
      <FooterNav />
    </div>
  )
}

export default View
