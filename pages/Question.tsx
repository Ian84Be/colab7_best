import React from 'react'
import Link from 'next/link'


export default function Question() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(e)
	}
	return (
		<div className="myContainer">
			<form onSubmit={handleSubmit}>
			<label htmlFor="food">BEST place for</label>
			<input id="food" name="food" type="text" autoComplete="food" required />
			<button type="submit">Submit</button>
			</form>
			<Link href="/"><a>Home</a></Link>
		</div>
	)
}
