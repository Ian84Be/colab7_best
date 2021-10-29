import { Input, Checkbox, TextArea } from 'semantic-ui-react'
import styles from '../../styles/Form.module.css'

const Step1 = ({ question, formData, handleChange }) => {
  const { food, occasion, author, location } = question
  return (
    <>
      <p>Help {author?.name} out.</p>
      <div className={styles.label}>
        {`What's`} the <div className={styles.logoFont}>BEST</div> place for
      </div>
      <div className={styles.label}>
        {food ? food.name : occasion.name} in {location}?
      </div>
      <p>Not decent. Not really good.</p>
      <div className={styles.label}>
        The <div className={styles.logoFont}>BEST!</div>
      </div>

      <Input
        className={styles.input}
        id="answer"
        name="answer"
        type="text"
        onChange={handleChange}
        placeholder="answer"
        value={formData.answer}
      />
      <Checkbox
        id="letMeKnow"
        name="letMeKnow"
        label="Let me know how everyone answers"
        onChange={handleChange}
        checked={formData.letMeKnow}
        className={styles.checkbox}
      />

      <label
        htmlFor="comment"
        className={styles.prompt}
        style={{ alignSelf: 'start' }}
      >
        Comment (optional)
      </label>
      <p
        className={styles.prompt_sub}
        style={{ margin: 0, alignSelf: 'start' }}
      >
        e.g. the BEST thing to order there
      </p>
      <TextArea
        className={styles.textArea}
        style={{
          border: '1px solid #05343a',
          fontSize: '16px',
          lineHeight: '20px',
        }}
        id="comment"
        name="comment"
        placeholder="comment"
        type="text"
        rows="4"
        onChange={handleChange}
        // value={formData.comment}
      />
    </>
  )
}
export default Step1
