import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Response.module.css'

const RankedResultCard = ({ answer }) => {
  const router = useRouter()
  const { questionId, rank, name, count } = answer
  let formatName = name.replace('&', '%26').replace('+', '%2B')
  // console.log({ formatName })

  return (
    <div
      key={name}
      className={styles.row}
      onClick={() => router.push(`/answer/${questionId}?best=${formatName}`)}
    >
      <div className={`${styles.rankNumber} ${rank === 1 && styles.topRank}`}>
        {rank}
      </div>
      <section className={styles.section}>
        <p className={styles.name}>{name}</p>
        <strong className={styles.votes}>{count} votes</strong>
      </section>
    </div>
  )
}
export default RankedResultCard
