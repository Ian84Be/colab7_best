import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const { placeId } = req.body
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const googlePlaceDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeId}&fields=name,geometry`
  console.log({ apiKey, placeId, googlePlaceDetails })
  const response = await fetch(googlePlaceDetails)
    .then((res) => {
      // console.log({ res })
      // console.log(res.body)
      return res.json()
    })
    .catch((err) => console.log({ err }))

  console.log('getPlaceDetails.ts () response', response)
  res.status(200).json({ data: response.result })
}
