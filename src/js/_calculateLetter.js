const letterOfCoordinatesArr = {
  en: {
    longitude: ['E', 'W'],
    latitude: ['N', 'S'],
  },
  ru: {
    longitude: ['В', 'З'],
    latitude: ['С', 'Ю'],
  },
}

const calculateLetterRu = (stringValue, returnValue) => {
  const coordinatesArr = stringValue.split(' ')
  const letter = coordinatesArr.pop()
  const idx = letterOfCoordinatesArr.en[returnValue].indexOf(letter)
  const letterRu = letterOfCoordinatesArr.ru[returnValue][idx]
  return `${coordinatesArr.join(' ')} ${letterRu}`
}

module.exports = calculateLetterRu
