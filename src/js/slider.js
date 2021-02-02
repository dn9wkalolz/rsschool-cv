let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const container = document.querySelector('.slider-wrapper');
const track = document.querySelector('.slider-track');
const btnNext = document.querySelector('.slider__button-next');
const btnPrev = document.querySelector('.slider__button-pre');
const items = document.querySelectorAll('.slider-item');
const itemsCount = items.length;
let itemWidth = container.clientWidth / slidesToShow;
let movePosition = slidesToScroll * itemWidth;

function calculateSizes() {
    itemWidth = container.clientWidth / slidesToShow;
    movePosition = slidesToScroll * itemWidth;
}
  
function setPosition() {
    track.style.transform = `translateX(${position}px)`;
}

function goNext() {
    calculateSizes();
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? movePosition : -itemWidth * (itemsCount - slidesToShow);
    setPosition()
}

function goPrev() {
    calculateSizes();
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
}

function onResize() {
    position = 0;
    setPosition();
}

btnNext.addEventListener('click', goNext);
btnPrev.addEventListener('click', goPrev);
window.addEventListener('resize', onResize);