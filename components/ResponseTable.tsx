import React from 'react'
import styles from '../styles/Response.module.css'
import { rank } from '../lib/helpers'
import RankedResultCard from './RankedResultCard'

const ResponseTable: React.FC<Props> = ({ answers, id }) => {
  const rankedResult = rank(answers)

  return (
    <div className={styles.responseContainer}>
      {rankedResult.map((a) => (
        <RankedResultCard key={a.name} answer={a} />
      ))}
    </div>
  )
}
export default ResponseTable
