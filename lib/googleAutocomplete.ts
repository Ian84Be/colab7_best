import { useState, useEffect } from 'react'

export const googleAutocomplete = async (text: string) => {
  return new Promise((resolve, reject) => {
    if (!text) return reject('need text input')
    if (typeof window === 'undefined') return reject('need window object')

    try {
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: text,
          componentRestrictions: { country: 'us' },
        },
        resolve
      )
    } catch (err) {
      return reject(err)
    }
  })
}

export function usePlacesAutocomplete(text = '', debounceTimeout = 400) {
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!text) return
        const nextPredictions = await googleAutocomplete(text)
        setPredictions(nextPredictions)
      } catch (err) {
        console.error(err)
      }
    }, debounceTimeout)

    return () => clearTimeout(handleDebounce)
  }, [text, debounceTimeout])

  return predictions
}
