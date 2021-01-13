const dayOfWeekArr = {
  en: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  ru: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
}

const createDayOfWeek = (todayStr, idx, language) => {
  const todayNum = dayOfWeekArr.ru.indexOf(todayStr)
  const countDayInWeek = 7
  const dayOfWeekNumber = todayNum + (idx + 1)
  const dayOfWeekString = dayOfWeekNumber > (countDayInWeek - 1) ? dayOfWeekArr[language][dayOfWeekNumber - countDayInWeek] : dayOfWeekArr[language][dayOfWeekNumber]
  return dayOfWeekString
}

module.exports = createDayOfWeek
