export async function fetchYelp<JSON = any>(input: RequestInfo): Promise<JSON> {
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  }
  const res = await fetch('https://api.yelp.com/v3/' + input, init).then(
    (res) => res.json()
  )
  return res
}
