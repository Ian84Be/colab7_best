import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Response.module.css'

const RankedResultCard = ({ answer }) => {
  const router = useRouter()
  const mapPage = router.pathname.match(/map/i)
  const { questionId, rank, name, count } = answer

  return (
    <div
      key={name}
      className={mapPage ? styles.mapRow : styles.row}
      onClick={() =>
        router.push(`/answer/${questionId}?best=${encodeURIComponent(name)}`)
      }
    >
      <div className={`${styles.rankNumber} ${rank === 1 && styles.topRank}`}>
        {rank}
      </div>
      <section className={styles.section}>
        <p className={styles.name}>{name.slice(0, 30)}</p>
        <strong className={styles.votes}>{count} votes</strong>
      </section>
    </div>
  )
}
export default RankedResultCard
