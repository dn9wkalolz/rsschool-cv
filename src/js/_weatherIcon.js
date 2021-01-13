const setIcon = (weatherName) => {
  switch (weatherName) {
    case ('Drizzle'):
      return '../../img/drizzle.svg'
    case ('Clear'):
      return '../../img/clear-day.svg'
    case ('Clouds'):
      return '../../img/cloudy.svg'
    case ('Rain'):
      return '../../img/rain.svg'
    case ('Fog'):
      return '../../img/mist.svg'
    case ('Haze'):
      return '../../img/mist.svg'
    case ('Snow'):
      return '../../img/snow.svg'
    case ('Thunderstorm'):
      return '../../img/thunder.svg'
    default:
      return '../../img/partly-cloudy-day.svg'
  }
}

module.exports = setIcon
