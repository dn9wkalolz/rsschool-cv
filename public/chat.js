const socket = io()
const nameField = document.getElementById('name')
const messageField = document.getElementById('message')
const receivedMessages = document.getElementById('all_mess')
const form = document.getElementById('messForm')
const feedback = document.getElementById('feedback')

const min = 1;
const max = 6;
let random = Math.floor(Math.random() * (max - min)) + min;

let alertClass;
switch (random) {
  case 1:
    alertClass = "secondary";
    break;
  case 2:
    alertClass = "danger";
    break;
  case 3:
    alertClass = "success";
    break;
  case 4:
    alertClass = "warning";
    break;
  case 5:
    alertClass = "info";
    break;
  case 6:
    alertClass = "light";
    break;
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('send message', {name: nameField.value, class: alertClass, text: messageField.value})
  messageField.value = ''
})

socket.on('received message', message => {
  receivedMessages.insertAdjacentHTML('beforeend', `<div class="alert alert-${message.class}"><b>${message.name}:</b> ${message.text}</div>`)
})

messageField.addEventListener('keypress', () => {
  socket.emit('typing', {name: nameField.value})
})

socket.on('typing', (data) => {
  feedback.innerHTML= `<p><b>${data.name}:</b> typing....</p>`
})