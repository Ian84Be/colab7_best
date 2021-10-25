import React from 'react'
import styles from '../../styles/Form.module.css'

const Progress: React.FC<Props> = ({ formStep }) => {
  const { progressButton, progressLine, progressButton_done, inactive } = styles
  const futureButton = `${progressButton} ${inactive}`
  const doneButton = `${progressButton} ${progressButton_done}`
  const inactiveLine = `${progressLine} ${inactive}`
  return (
    <div className={styles.progressContainer}>
      <span className={formStep === 1 ? progressButton : doneButton}>1</span>
      <span className={formStep === 1 ? inactiveLine : progressLine} />

      {formStep < 2 && <span className={futureButton}>2</span>}
      {formStep === 2 && <span className={progressButton}>2</span>}
      {formStep <= 2 && <span className={inactiveLine} />}
      {formStep > 2 && <span className={doneButton}>2</span>}
      {formStep > 2 && <span className={progressLine} />}

      {formStep < 3 && <span className={futureButton}>3</span>}
      {formStep === 3 && <span className={progressButton}>3</span>}
      {formStep > 3 && <span className={doneButton}>3</span>}
    </div>
  )
}
export default Progress
