import {
  createTooltip,
} from './_tooltip'

const form = document.querySelector('form')
const button = document.querySelector('form button')
const person = document.getElementById('name')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const describe = document.getElementById('describe')

function createFeedback(data) {
  return fetch('https://form-portfolio-app-default-rtdb.firebaseio.com/feedback.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formInfo = {
    person: person.value,
    email: email.value,
    subject: subject.value,
    describe: describe.value,
    date: new Date().toJSON(),
  }
  button.disabled = true
  button.classList.add('processed')
  createFeedback(formInfo).then((response) => {
    if (response.error) {
      form.reset()
      button.disabled = false
      button.classList.remove('processed')
      createTooltip(button, 'Something went wrong, please try again!')
      return
    }
    form.reset()
    button.disabled = false
    button.classList.remove('processed')
    createTooltip(button, 'Success, thanks for the feedback!')
  })
    .catch(() => {
      form.reset()
      button.disabled = false
      button.classList.remove('processed')
      createTooltip(button, 'Something went wrong, please try again!')
    })
})
