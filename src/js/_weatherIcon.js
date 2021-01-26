import Drizzle from '../img/drizzle.svg'
import Clear from '../img/clear-day.svg'
import Clouds from '../img/cloudy.svg'
import Rain from '../img/rain.svg'
import Fog from '../img/mist.svg'
import Snow from '../img/snow.svg'
import Thunderstorm from '../img/thunder.svg'
import Default from '../img/partly-cloudy-day.svg'
export function setIcon(weatherName) {
  switch (weatherName) {
    case ('Drizzle'):
      return Drizzle
    case ('Clear'):
      return Clear
    case ('Clouds'):
      return Clouds
    case ('Rain'):
      return Rain
    case ('Fog'):
      return Fog
    case ('Haze'):
      return Fog
    case ('Snow'):
      return Snow
    case ('Thunderstorm'):
      return Thunderstorm
    default:
      return Default
  }
}