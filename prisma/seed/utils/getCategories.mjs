import response from './response.json'
import fs from 'fs'

let { categories } = response
let result = []

categories.forEach((cat) => {
  if (
    cat.parent_aliases.includes('food') ||
    cat.parent_aliases.includes('restaurants')
  )
    result.push(cat.title)
  else return
})

console.log(result, result.length)
result = JSON.stringify(result)
fs.writeFile('result.json', result, 'utf-8', (err) => {
  if (err) throw err
})
