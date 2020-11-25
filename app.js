const timeButton = document.querySelectorAll(".time-select button");
const timeValue = document.querySelector(".time-display");
const mudeButton = document.querySelectorAll(".sound-picker button");
const playButton = document.querySelector(".play");
const replayButton = document.querySelector(".replay");

const video = document.querySelector("video");
const sound = document.querySelector("audio");

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

let fakeDuratation = 600;
let minute = Math.floor(fakeDuratation / 60);
let second = Math.floor(fakeDuratation % 60);
timeValue.textContent = `${minute} : ${second}`;

timeButton.forEach(button => {
  button.addEventListener("click", function() {
    fakeDuratation = this.getAttribute("data-time");
    minute = Math.floor(fakeDuratation / 60);
    second = Math.floor(fakeDuratation % 60);
    timeValue.textContent = `${minute} : ${second}`;
  })
});

mudeButton.forEach(button => {
  button.addEventListener("click", function() {
    video.src = this.getAttribute("data-video");
    sound.src = this.getAttribute("data-sound");
  })
});

playButton.addEventListener("click", playSondAndVideo);

function playSondAndVideo() {
  if(sound.paused) {
    video.play();
    sound.play();
    playButton.src = "/svg/pause.svg";
  }else {
    video.pause();
    sound.pause();
    playButton.src = "/svg/play.svg";
  }
}

sound.ontimeupdate = function() {
  let currentTime = sound.currentTime;
  let elapsed = fakeDuratation - currentTime;
  minute = Math.floor(elapsed / 60);
  second = Math.floor(elapsed % 60);
  timeValue.textContent = `${minute} : ${second}`;
  outline.style.strokeDashoffset = outlineLength - (currentTime / fakeDuratation) * outlineLength;
  if(currentTime >= fakeDuratation) {
    video.pause();
    sound.pause();
    playButton.src = "/svg/play.svg";
    sound.currentTime = 0;
  }
}

replayButton.addEventListener("click", replaySoundAndVideo);

function replaySoundAndVideo() {
  video.pause();
  sound.pause();
  playButton.src = "/svg/play.svg";
  sound.currentTime = 0;
}







