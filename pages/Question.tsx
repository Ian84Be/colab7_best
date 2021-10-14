import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import homeIcon from '../public/images/home_button.svg'
import Image from 'next/image'

export default function Question() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(e)
	}
	return (
		<div className={styles.content}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<label htmlFor="food"><Link href="/"><a>BEST</a></Link> place for</label>
				<input id="food" name="food" type="text" autoComplete="food" required />
				<button type="submit" className={styles.submit_button}>Next</button>
			</form>

			<footer className={styles.footer}>
				<Link href="/">
					<a className={styles.footer_button}>
					<Image src={homeIcon} alt="Home" width={24} height={24}/>
					</a>
				</Link>
				
				<Link href="/"><a className={styles.footer_button}>Responses</a></Link>
			</footer>
		</div>
	)
}
