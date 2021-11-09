import type { GetServerSideProps } from 'next'
import { useState, useRef, useEffect } from 'react'
import prisma from '../../lib/prisma'
import styles from '../../styles/Answer.module.css'
import { rank } from '../../lib/helpers'
import RankedResultCard from '../../components/RankedResultCard'
import { Loader } from '@googlemaps/js-api-loader'
import { addMarker } from '../../lib/helpers'

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { lat, lng } = query
  const answers = await prisma.answer.findMany({
    where: {
      questionId: Number(params?.mapQuestion) || -1,
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

  return { props: { answers, lat, lng } }
}

const View: React.FC<Props> = ({ answers, lat, lng }) => {
  const rankedResult = rank(answers)
  console.log({ rankedResult })

  lat = parseFloat(lat)
  lng = parseFloat(lng)
  let googleMap = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    })
    if (googleMap.current && !map)
      loader.load().then(() => {
        const google = window.google
        const myMap = new google.maps.Map(googleMap.current, {
          center: {
            lat,
            lng,
          },
          zoom: 18,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
          mapTypeControl: false,
          fullscreenControl: false,
        })

        // console.log({ map, answers })
        answers.forEach((answer) => addMarker(rankedResult[0], answer, myMap))
        setMap(myMap)
      })
  }, [answers, rankedResult, googleMap, map, lat, lng])

  return (
    <div className={styles.answer_content}>
      <div ref={googleMap} className={styles.googleMap} />

      <section className={styles.responseContainer}>
        {rankedResult.map((a) => (
          <RankedResultCard key={a.name} answer={a} />
        ))}
      </section>
    </div>
  )
}

export default View
