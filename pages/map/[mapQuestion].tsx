import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import prisma from '../../lib/prisma'
import styles from '../../styles/Answer.module.css'
import { rank } from '../../lib/helpers'
import RankedResultCard from '../../components/RankedResultCard'
import { Loader } from '@googlemaps/js-api-loader'
import { addMarker } from '../../lib/helpers'
import Chevron from '../../components/Icons/Chevron'

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

  return { props: { params, answers, lat, lng } }
}

const View: React.FC<Props> = ({ params, answers, lat, lng }) => {
  const router = useRouter()
  const rankedResult = rank(answers)
  // console.log({ rankedResult })
  const [activePin, setActivePin] = useState(0)
  console.log({ activePin })

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
          streetViewControl: false,
          zoomControl: false,
        })

        // console.log({ map, answers })
        answers.forEach((answer) => addMarker(rankedResult[0], answer, myMap))
        setMap(myMap)
      })
  }, [answers, rankedResult, googleMap, map, lat, lng])

  const handleChange = (e) => {
    let newPin = activePin
    if (e === 'back') newPin -= 1
    if (e === 'next') newPin += 1
    const { lat, lng } = rankedResult[newPin]
    console.log('handlChangenN', rankedResult[newPin])
    setActivePin(newPin)
    router.push(`/map/${params.mapQuestion}?lat=${lat}&lng=${lng}`)
    map.panTo(new google.maps.LatLng(lat, lng))
  }
  return (
    <div className={styles.answer_content}>
      <Link href="/Responses">
        <a className={styles.map_back_nav}>
          <Chevron rotate={90} />
        </a>
      </Link>
      <div ref={googleMap} className={styles.googleMap} />

      <section className={styles.responseContainer}>
        {activePin > 0 ? (
          <Chevron
            name="back"
            rotate={90}
            onClick={() => handleChange('back')}
          />
        ) : (
          <span style={{ width: '24px' }}></span>
        )}
        {rankedResult.map((a, i) =>
          i === activePin ? <RankedResultCard key={a.name} answer={a} /> : <></>
        )}
        {activePin < rankedResult.length - 1 && (
          <Chevron
            name="next"
            rotate={270}
            onClick={() => handleChange('next')}
          />
        )}
      </section>
    </div>
  )
}

export default View
