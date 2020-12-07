const time = document.getElementById('time');
const greet = document.getElementById('greet');
const answer = document.getElementById('answer');
const name = document.getElementById('name');

function showTime() {
    let currentTime = new Date(),
        hour = currentTime.getHours(),
        minute = currentTime.getMinutes(),
        second = currentTime.getSeconds();
        pmAM = '';
    pmAM = hour < 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    if(second < 10) {
        second = `0${second}`;
    }
    if(minute < 10) {
        minute = `0${minute}`;
    }
    if(hour < 10) {
        hour = `0${hour}`;
    }
    time.innerHTML = `${hour} : ${minute} : ${second} ${pmAM}`;
    setTimeout(showTime, 1000);
}

function changeBackGroundGreet() {
    let currentTime = new Date(),
        hour = currentTime.getHours();   
    if(hour < 12) {
        document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
        greet.innerHTML = 'Good Morning, ';
    }else if(hour < 18) {
        document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greet.innerHTML = 'Good Afternoon, ';

    }else {
        document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
        document.body.style.color = "white";
        greet.innerHTML = 'Good Evening, ';
    }

}

function getName() {
    if(!localStorage.getItem('name')) {
        name.innerHTML = '[Enter Name]';
    }else {
        name.innerHTML = localStorage.getItem('name');
    }
}

function getAnswer() {
    if(!localStorage.getItem('answer')) {
        answer.innerHTML = '[Enter Answer]';
    }else {
        answer.innerHTML = localStorage.getItem('answer');
    }
}

function setName(event) {
    if (event.type === 'keypress' && event.keyCode == 13) {
        localStorage.setItem('name', event.target.innerText);
        name.blur();
    } else {
      localStorage.setItem('name', event.target.innerText);
    }
}

function setAnswer(event) {
    if(event.type === 'keypress' && event.keyCode === 13) {
            localStorage.setItem('answer', event.target.innerText);
            answer.blur();
            makeFreedom();
    }else {
        localStorage.setItem('answer', event.target.innerText);
        makeFreedom();
    }
}

function makeFreedom() {
    if(answer.innerText.toLocaleLowerCase() === 'no') {
        document.body.style.backgroundImage = "url('https://img2.goodfon.ru/wallpaper/nbig/c/5d/flagi-belarus-pagonya.jpg')";
        document.body.style.color = 'black';
        greet.innerHTML = 'Belarus is freedom, ';
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
answer.addEventListener('keypress', setAnswer);
answer.addEventListener('blur', setAnswer);



changeBackGroundGreet();
showTime();
getName();
getAnswer();