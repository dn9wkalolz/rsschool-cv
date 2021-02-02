const cityValidator = (name) => {
  const regex = /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/
  return regex.test(name)
}

module.exports = cityValidator
