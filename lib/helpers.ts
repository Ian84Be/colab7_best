export function rank(answers) {
  const { questionId } = answers[0]
  // console.log({ answers })
  // console.log(answers[0].lat)

  let count = {}
  answers.forEach((a) => {
    const { answer, lat, lng } = a
    if (count[answer]) count[answer].count += 1
    else {
      count[answer] = {
        count: 1,
        lat,
        lng,
      }
    }
  })

  let result = []
  for (const name in count) {
    result.push({
      name,
      count: count[name].count,
      questionId,
      lat: count[name].lat,
      lng: count[name].lng,
    })
  }

  result.sort((a, b) => {
    if (a.count > b.count) return -1
    if (a.count < b.count) return 1
    if (a.count === b.count) return 0
  })
  let ranking = 1
  result.forEach((a) => (a.rank = ranking++))
  // console.log({ result })
  return result
}

export function displayTime(militaryTime: string): string {
  let milTime = Number(militaryTime)
  let midday = milTime < 1300 ? 'am' : 'pm'
  let converted = 0
  if (milTime < 100) converted = milTime + 1200
  if (milTime < 1300) converted = milTime
  if (milTime >= 1300) converted = milTime - 1200
  let result = converted.toString()
  if (result.length === 3 && result[1] !== '3' && result[2] === '0')
    result = result[0]
  if (result.length === 4 && result[2] !== '3' && result[3] === '0')
    result = result.slice(0, 2)
  return result + midday
}

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const mapMarker = {
  width: 40,
  height: 44,
  path: 'M26.6812 38.8568C34.4415 36.1072 40 28.7027 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 28.7027 5.55845 36.1072 13.3188 38.8568L20 44L26.6812 38.8568Z',
}

export function addMarker(topRank, a, myMap) {
  let { lat, lng, answer } = a

  const svgData = {
    anchor: new google.maps.Point(mapMarker.width / 2, mapMarker.height / 2),
    path: mapMarker.path,
    fillColor: '#CACACA',
    fillOpacity: 1,
    strokeOpacity: 0,
  }
  if (topRank.name === answer) svgData.fillColor = '#EA3858'

  new google.maps.Marker({
    map: myMap,
    icon: svgData,
    position: {
      lat,
      lng,
    },
    title: answer,
    label: {
      text: '1',
      fontFamily: 'sans serif',
      color: '#F8F8F8',
      fontSize: '16px',
    },
  })
}

export const businessFieldsFragment = `
fragment businessFields on Business {
	name
	display_phone
	location {
		address1
		city
		state
		postal_code
	}
	coordinates {
		latitude
		longitude
	}
	photos
	url
	hours {
		open {
			day
			start
			end
		}
	}
}
`
