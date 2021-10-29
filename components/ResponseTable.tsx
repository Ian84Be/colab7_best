import React from 'react'
import styles from '../styles/Response.module.css'
import { useRouter } from 'next/router'

const ResponseTable: React.FC<Props> = ({ answers, id }) => {
  // console.log({ answers })
  const router = useRouter()

  const rankedResult = rank(answers)
  function rank(answers) {
    let count = {}
    answers.forEach(({ answer }) => {
      if (count[answer]) count[answer] += 1
      else count[answer] = 1
    })

    let result = []
    for (const name in count) {
      result.push({
        name,
        count: count[name],
      })
    }

    result.sort((a, b) => {
      if (a.count > b.count) return -1
      if (a.count < b.count) return 1
      if (a.count === b.count) return 0
    })
    let ranking = 1
    result.forEach((a) => (a.rank = ranking++))
    // console.log({ result })
    return result
  }

  return (
    <div className={styles.responseContainer}>
      {rankedResult.map((a) => (
        <div
          key={a.name}
          className={styles.row}
          onClick={() => router.push(`/answer/${id}?best=${a.name}`)}
        >
          <div
            className={`${styles.rankNumber} ${a.rank === 1 && styles.topRank}`}
          >
            {a.rank}
          </div>
          <section className={styles.section}>
            <p className={styles.name}>{a.name}</p>
            <strong className={styles.votes}>{a.count} votes</strong>
          </section>
        </div>
      ))}
    </div>
  )
}
export default ResponseTable
