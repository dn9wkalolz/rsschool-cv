import {
  print,
} from './_typing'

const wrapId = document.querySelectorAll('.wrapper')
const link = document.querySelectorAll('.menu a')
const navBar = document.querySelector('.navbar')
const scrollUpBtn = document.querySelector('.scroll-up-btn')
const homeTyped = document.querySelector('.home-typed')
const aboutTyped = document.querySelector('.about-typed')
const sideMenu = document.querySelector('.menu')
const menuButtons = document.querySelectorAll('.menu-btn')

function stickyHandler(curpos) {
  if (curpos > 101 && !navBar.className.includes('sticky')) {
    navBar.classList.add('sticky')
  } else if (curpos < 20) {
    navBar.classList.remove('sticky')
  }
}

function showScrollUpBtn(curpos) {
  if (curpos > 500 && !navBar.className.includes('show')) {
    scrollUpBtn.classList.add('show')
  } else if (curpos < 500) {
    scrollUpBtn.classList.remove('show')
  }
}

function menuHandler(curpos) {
  wrapId.forEach((el) => {
    if (el.offsetTop <= curpos && (el.offsetTop + el.offsetHeight) > curpos) {
      link.forEach((a) => {
        a.classList.remove('active')
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active')
        }
      })
    }
  })
}

function onScroll() {
  const curPos = window.scrollY
  menuHandler(curPos)
  stickyHandler(curPos)
  showScrollUpBtn(curPos)
}

function moveUp() {
  window.scrollTo({
    top: 0,
  })
}

window.addEventListener('DOMContentLoaded', () => {
  scrollUpBtn.addEventListener('click', moveUp)
  window.addEventListener('scroll', onScroll)
  print(['CSS.', 'HTML.', 'JavaScript.', 'SASS', 'WebPack', 'GIT'], homeTyped)
  print(['hardworking.', 'persistent.', 'smart.'], aboutTyped)
  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      sideMenu.classList.toggle('active')
    })
  })
})
