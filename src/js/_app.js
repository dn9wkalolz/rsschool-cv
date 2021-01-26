import {setIcon} from './_weatherIcon'
const FW = {
  position: {
    longitude: null,
    latitude: null,
    timeZone: undefined,
    city: null,
  },

  elements: {
    longitudeTitle: null,
    latitudeTitle: null,
    place: null,
    time: null,
    todayTemperature: null,
    todayIcon: null,
    todayDescription: null,
    fewDaysTemperature: null,
    fewDaysIcon: null,
    fewDaysOfWeek: null,
    searchButton: null,
    searchButtonText: null,
    searchButtonBg: null,
    searchInput: null,
    tempSwitch: null,
    tempButtons: null,
    languageDropList: null,
    refreshButton: null,
    refreshImage: null,
  },

  properties: {
    language: null,
    dayCount: 25,
    unitsOfTemp: null,
    unitsOfWindSpeed: null,
  },

  languageTemplate: {
    ru() {
      localStorage.setItem('language', 'ru')
      this.createDayOfWeek()
      this.properties.unitsOfWindSpeed = this.properties.unitsOfTemp === 'imperial' ? 'миль/ч' : 'метров/с'
      this.elements.searchInput.placeholder = 'Поиск города'
      this.elements.searchButtonText.innerText = 'поиск'
      this.elements.todayDescription.innerHTML = `<span>${this.today.description}</span>
            <span>ощущается: ${this.today.feels_like}°</span>
            <span>ветер: ${this.today.windSpeed} ${this.properties.unitsOfWindSpeed}</span>
            <span>влажность: ${this.today.humidity}%</span>`
    },
    en() {
      localStorage.setItem('language', 'en')
      this.createDayOfWeek()
      this.properties.unitsOfWindSpeed = this.properties.unitsOfTemp === 'imperial' ? 'miles/h' : 'meters/s'
      this.elements.searchInput.placeholder = 'Search city'
      this.elements.searchButtonText.innerText = 'search'
      this.elements.todayDescription.innerHTML = `<span>${this.today.description}</span>
            <span>feels like: ${this.today.feels_like}°</span>
            <span>wind: ${this.today.windSpeed} ${this.properties.unitsOfWindSpeed}</span>
            <span>humidity: ${this.today.humidity}%</span>`
    },
  },

  today: {
    feels_like: null,
    humidity: null,
    temp: null,
    description: null,
    icon: null,
    windSpeed: null,
    dayOfWeek: null,
  },

  fewDaysIconsArr: null,
  fewDaysTemperatureArr: null,
  backgroundsArr: null,

  initializeApp() {
    this.elements.latitudeTitle = document.querySelector('.map__coordinates__latitude')
    this.elements.longitudeTitle = document.querySelector('.map__coordinates__longitude')
    this.elements.place = document.querySelector('.weather__country')
    this.elements.time = document.querySelector('.weather__data-time')
    this.elements.todayTemperature = document.querySelector('.weather__today__temperature')
    this.elements.todayIcon = document.querySelector('.weather__today__forecast__cloudy__img')
    this.elements.todayDescription = document.querySelector('.weather__today__forecast__description')
    this.elements.fewDaysTemperature = document.querySelectorAll('.weather__few-day__block__forecast__temperature')
    this.elements.fewDaysIcon = document.querySelectorAll('.weather__few-day__block__forecast__cloudy__img')
    this.elements.fewDaysOfWeek = document.querySelectorAll('.weather__few-day__block__day')
    this.elements.searchButton = document.querySelector('.search')
    this.elements.searchButtonText = document.querySelector('.search__button__text')
    this.elements.searchButtonBg = document.querySelector('.search__button__bg')
    this.elements.searchInput = document.querySelector('.search-input')
    this.elements.tempSwitch = document.querySelector('.control-panel__temperature')
    this.elements.tempButtons = document.querySelectorAll('.control-panel__temperature div')
    this.elements.languageDropList = document.querySelector('.language-droplist__options')
    this.elements.refreshButton = document.querySelector('.refresh')
    this.elements.refreshImage = document.querySelector('.img_refresh')
    this.elements.searchButton.addEventListener('click', this.inputHandler.bind(this))
    this.elements.searchInput.addEventListener('search', this.inputHandler.bind(this))
    this.elements.tempSwitch.addEventListener('click', this.switchTemperature.bind(this))
    this.elements.languageDropList.addEventListener('change', this.switchLanguage.bind(this))
    this.elements.refreshButton.addEventListener('click', this.refreshApp.bind(this))
    this.localStorageHandler()
    this.getPositionByNavigator()
    this.showTime()
  },

  async getPositionByNavigator() {
    const navigatorOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    navigator.geolocation.getCurrentPosition(this.getCoordinates.bind(this), this.getErrNavigator.bind(this), navigatorOptions)
  },

  async getCoordinates(position) {
    try {
      this.position.latitude = parseFloat(position[0]) || position.coords.latitude
      this.position.longitude = parseFloat(position[1]) || position.coords.longitude
      await this.getPositionByOpenCage()
      await this.getBackground()
      await this.setBackground()
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  async getPositionByIp() {
    try {
      const url = 'https://ipinfo.io/json?token=7c4ac6eb56abcd'
      const resultPos = await fetch(url)
      const dataPos = await resultPos.json()
      const position = dataPos.loc.split(',')
      await this.getCoordinates(position)
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  getErrNavigator(e) {
    this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    this.getPositionByIp()
  },

  async getPositionByOpenCage() {
    try {
      const opencage = require('opencage-api-client')
      const options = {
        q: `${this.position.city || `${this.position.latitude}, ${this.position.longitude}`}`,
        language: `${this.properties.language}`,
        pretty: 1,
        key: '45c4ad9d85634a7b9c4baf9c56248a1d',
      }
      const data = await opencage.geocode(options)
      this.position.latitude = data.results[0].geometry.lat
      this.position.longitude = data.results[0].geometry.lng
      const place = data.results[0].components.city || data.results[0].components.county
      this.createPlace(place, data.results[0].components.country)
      this.position.timeZone = data.results[0].annotations.timezone.name
      await this.getWeatherByAPI()
      await this.getMap()
      this.setCoordinates(data.results[0].annotations.DMS.lng, data.results[0].annotations.DMS.lat)
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  async getWeatherByAPI() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.position.latitude}&lon=${this.position.longitude}&lang=${this.properties.language}&cnt=${this.properties.dayCount}&units=${this.properties.unitsOfTemp}&appid=238369625c38823901147f9e59ee369d`
      const resultWeather = await fetch(url)
      const dataWeather = await resultWeather.json()
      this.createDayWeather(dataWeather.list[0], dataWeather.list[8], dataWeather.list[16], dataWeather.list[24])
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  async getMap() {
    try {
      const mapboxgl = require('mapbox-gl')
      mapboxgl.accessToken = 'pk.eyJ1IjoiZmFudG9td2Fsa2VyIiwiYSI6ImNramxmcXd2eTIyc2Iyc2xvcTJ3cmdsNmwifQ.mU8FFb3Kc3cihmCMAk6Spw'
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 11,
        center: [this.position.longitude, this.position.latitude],
      })
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  createPlace(place, country) {
    this.elements.place.innerText = `${place}, ${country}`
  },

  setCoordinates(longitudeString, latitudeString) {
    const calculateLetterRu = require('./_calculateLetter')
    if (this.properties.language === 'ru') {
      longitudeString = calculateLetterRu(longitudeString, 'longitude')
      latitudeString = calculateLetterRu(latitudeString, 'latitude')
    }
    this.elements.longitudeTitle.innerText = longitudeString
    this.elements.latitudeTitle.innerText = latitudeString
  },

  createDayWeather(todayData, ...fewDaysWeather) {
    [this.today.feels_like, this.today.humidity, this.today.temp, this.today.description, this.today.icon, this.today.windSpeed] = [Math.round(todayData.main.feels_like), todayData.main.humidity, Math.round(todayData.main.temp), todayData.weather[0].description, todayData.weather[0].main, Math.round(todayData.wind.speed)]
    const fewDaysTemperatureArr = fewDaysWeather.map(elem => parseInt(Math.round(elem.main.temp)))
    const fewDaysIconsArr = fewDaysWeather.map(elem => elem.weather[0].main)
    this.createWeatherToday()
    this.createTemperatureFewDay(fewDaysTemperatureArr)
    this.createIconFewDay(fewDaysIconsArr)
  },

  createWeatherToday() {
    this.elements.todayTemperature.innerText = `${this.today.temp}°`
    this.elements.todayIcon.src = setIcon(this.today.icon)
    this.languageTemplate[this.properties.language].call(this)
  },

  createTemperatureFewDay(tempArr) {
    this.elements.fewDaysTemperature.forEach((elem, idx) => {
      elem.innerText = `${tempArr[idx]}°`
    })
  },

  createIconFewDay(iconArr) {
    this.elements.fewDaysIcon.forEach((elem, idx) => {
      elem.src = setIcon(iconArr[idx])
    })
  },

  createDayOfWeek() {
    const calculateDayOfWeek = require('./_calculateDayOfWeek')
    this.elements.fewDaysOfWeek.forEach((elem, idx) => {
      elem.innerText = calculateDayOfWeek(this.today.dayOfWeek, idx, this.properties.language)
    })
  },

  async getBackground() {
    try {
      const key = 'f6abce8b06ddadd4f16c2d1e12dbdbb3'
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=night,evening,sunset&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`
      const result = await fetch(url)
      const data = await result.json()
      this.backgroundsArr = Array.from(data.photos.photo).filter((elem) => elem.url_h !== undefined)
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  async setBackground() {
    try {
      const arrLength = this.backgroundsArr.length - 1
      const imgUrl = this.backgroundsArr[Math.round(Math.random() * arrLength)].url_h
      const image = new Image()
      image.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${image.src}')`
      })
      image.src = imgUrl
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
    }
  },

  showTime() {
    const date = new Date()
    const options = {
      timeZone: this.position.timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    }
    this.elements.time.innerHTML = date.toLocaleString(`${this.properties.language}`, options)
    const localWeekDayString = date.toLocaleString('ru', {
      timeZone: this.position.timeZone, weekday: 'short',
    })
    if (localWeekDayString !== this.today.dayOfWeek) {
      this.today.dayOfWeek = localWeekDayString
      this.createDayOfWeek()
    }
    setTimeout(() => this.showTime(), 1000)
  },

  async inputHandler(event) {
    try {
      if (this.elements.searchInput.value || parseInt(event.currentTarget.dataset.key) === 13) {
        if (!this.elements.searchInput.validity.valid) {
          this.createTooltip(this.elements.searchInput, 'invalid input')
          return
        }
        this.position.city = this.elements.searchInput.value
        this.toggleActive(this.elements.searchButtonBg)
        await this.getPositionByOpenCage()
        await this.toggleActive(this.elements.searchButtonBg)
        await this.setBackground()
      }
    } catch (e) {
      this.createTooltip(this.elements.searchInput, `ERROR(${e.code}): ${e.message}`)
      this.toggleActive(this.elements.searchButtonBg)
    }
  },

  switchTemperature(event) {
    this.elements.tempButtons.forEach((elem) => {
      elem.classList.remove('active')
    })
    event.target.classList.add('active')
    switch (event.target.dataset.temp) {
      case 'imperial':
        localStorage.setItem('temperature', 'imperial')
        this.properties.unitsOfTemp = 'imperial'
        this.properties.unitsOfWindSpeed = this.properties.language === 'en' ? 'miles/h' : 'миль/ч'
        this.getWeatherByAPI()
        break
      case 'metric':
        localStorage.setItem('temperature', 'metric')
        this.properties.unitsOfTemp = 'metric'
        this.properties.unitsOfWindSpeed = this.properties.language === 'en' ? 'meters/s' : 'метров/c'
        this.getWeatherByAPI()
        break
    }
  },

  switchLanguage(event) {
    switch (event.target.options[event.target.selectedIndex].dataset.lang) {
      case 'en':
        this.properties.language = 'en'
        this.getPositionByOpenCage()
        break
      case 'ru':
        this.properties.language = 'ru'
        this.getPositionByOpenCage()
        break
    }
  },

  async refreshApp() {
    try {
      this.position.city = null
      this.position.timeZone = undefined
      this.toggleActive(this.elements.refreshButton)
      this.toggleActive(this.elements.refreshImage)
      await this.getPositionByIp()
      await this.toggleActive(this.elements.refreshButton)
      await this.toggleActive(this.elements.refreshImage)
    } catch (e) {
      this.createTooltip(this.elements.refreshButton, `ERROR(${e.code}): ${e.message}`)
      this.toggleActive(this.elements.refreshButton)
      this.toggleActive(this.elements.refreshImage)
    }
  },

  localStorageHandler() {
    this.properties.language = localStorage.getItem('language') || 'en'
    this.properties.unitsOfTemp = localStorage.getItem('temperature') || 'imperial'
    this.elements.languageDropList.selectedIndex = this.properties.language === 'en' ? 0 : 1 /// 0,1 is number of selected <option>
    this.elements.tempButtons.forEach((elem) => {
      if (elem.dataset.temp === this.properties.unitsOfTemp) {
        elem.classList.add('active')
      }
    })
  },

  async toggleActive(domElement) {
    domElement.classList.toggle('active')
  },

  createTooltip: require('./_tooltip'),
}

window.addEventListener('DOMContentLoaded', FW.initializeApp.bind(FW));
