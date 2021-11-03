import { useState, useEffect } from 'react'
const localApi = 'http://localhost:3000/api/'

export const googleLatLng = async (placeId: string) => {
  const response = await fetch(localApi + 'getPlaceDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ placeId }),
  })
    .then((res) => {
      // console.log(res)
      return res.json()
    })
    .catch((err) => console.log({ err }))

  // console.log({ response })
  let { lat, lng } = response?.data.geometry.location
  return { lat, lng }
}

export type googleCoords = {
  lat: number | null
  lng: number | null
}

export const googleAutocomplete = async (
  text: string,
  types: Array<string>,
  coords: googleCoords
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { lat, lng } = coords
    if (!text) return reject('need text input')
    if (typeof window === 'undefined') return reject('need window object')

    const options: google.maps.places.AutocompletionRequest = {
      input: text,
      componentRestrictions: { country: 'us' },
      types,
    }

    if (lat && lng) {
      options.location = new google.maps.LatLng({
        lat,
        lng,
      })
      options.radius = 2000
    }

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        options,
        resolve
      )
    } catch (err) {
      return reject(err)
    }
  })
}

export function usePlacesAutocomplete(
  text = '',
  types = ['(cities)'],
  location = { lat: null, lng: null },
  debounceTimeout = 400
) {
  const [predictions, setPredictions] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([])
  const { lat, lng } = location
  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!text) return
        let nextPredictions: Array<google.maps.places.AutocompletePrediction> =
          await googleAutocomplete(text, types, {
            lat,
            lng,
          })
        setPredictions(nextPredictions)
      } catch (err) {
        console.error(err)
      }
    }, debounceTimeout)

    return () => clearTimeout(handleDebounce)
  }, [text, debounceTimeout])

  return predictions
}
