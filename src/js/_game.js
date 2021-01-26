const { waterfall } = require("async");

const Raindrop = {
    values: {
        fairwayLimit: null,
        incrementOffsetTop: null,
        calculatorResult: null,
        raindropsArray: [],
        lifeCounter: null,
        timerCreation: null,

        trialTimer: null,

        initialFairwayHeight: null,
        raindropOffsetWidth: null,

        selectedOperations: null,
        selectedNumberType: null,

        startIsTrue: false,
        restartIsTrue: false,
        trialIsTrue: false,
            
        movementDelay: 1000,
        creationDelay: 5000,
        initialPoints: 10,
        raindropsCount: 0,
    },

    elements: {
        area: null,
        fairway: null,
        input: null,
        score: null,
        controlpanel: null,
        optionsButtons: null,
        sounds: null,
        optionsButtons: null,
        endingWindow: null,
        endingWindowStatistic: null
    },

    keyCodeTemplate: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57],

    calculator: {
        '-': (a, b) => parseInt(a) - parseInt(b),
        '+': (a, b) => parseInt(a) + parseInt(b),
        '*': (a, b) => parseInt(a) * parseInt(b),
        '/': (a, b) => parseInt(a) / parseInt(b)
    },

    initializeGame() {
        const clickableCalcButtons = document.querySelectorAll('[data-key]');

        this.elements.endingWindow = document.querySelector('.main__ending__window');
        this.elements.endingWindowStatistic = document.querySelectorAll('.main__ending__window span');
        this.elements.optionsButtons = document.querySelectorAll('button');
        this.elements.sounds = document.querySelectorAll('audio');
        this.elements.fairway = document.querySelector('.main__gamezone__area__fairway');
        this.elements.area = document.querySelector('.main__gamezone__area');
        this.elements.input = document.querySelector('.main__gamezone__controlpanel__calculator-result__value__input');
        this.elements.score = document.querySelectorAll('.main__gamezone__controlpanel__scoreboard span');
        this.elements.controlpanel = document.querySelector('.main__gamezone__controlpanel');

        this.values.initialFairwayHeight = this.elements.fairway.offsetHeight;

        window.addEventListener('keypress', this.setInputResult.bind(this));
        this.elements.controlpanel.addEventListener('transitionend', this.removeTransition);
        this.elements.optionsButtons.forEach(button => {
            button.addEventListener('click', this[button.dataset.option].bind(this));
        });
        clickableCalcButtons.forEach(button => {
            button.addEventListener('click', this.setInputResult.bind(this))
        });
    },

    start() {
        if(this.values.trialIsTrue || this.values.startIsTrue || !this.values.selectedOperations || !this.values.selectedNumberType) {
            return;
        }
        this.values.startIsTrue = true;
        this.values.restartIsTrue = false;
        this.createIncrementOffsetTop();
        this.setFairwayLimit();
        this.createRaindrop();
        this.elements.sounds[0].play();
    },

    restart(){
        clearTimeout(this.values.timerCreation);
        this.elements.optionsButtons.forEach(elem => elem.classList.remove('active'));
        this.values.restartIsTrue = true;
        this.values.trialIsTrue = false;
        this.values.startIsTrue = false;

        this.elements.sounds[0].pause();
        this.values.raindropOffsetWidth = null;
        this.values.fairwayLimit = null;
        this.values.calculatorResult = null;
        this.values.scoreResult = null;
        this.values.raindropResult =null;
        this.values.lifeCounter = null;
        this.values.selectedOperations = null,
        this.values.selectedNumberType = null,
        this.values.timerCreation = null;
        this.values.trialTimer = null;
        this.elements.fairway.style.height = `${this.values.initialFairwayHeight}px`;
        this.values.movementDelay = 1000;
        this.values.creationDelay = 5000;
        this.values.initialPoints = 10;
        this.values.raindropsCount = 0;
        this.elements.score[1].innerText = '';
    },

    startTrial() {
        if(this.values.trialIsTrue || this.values.startIsTrue) {
            return;
        }
        this.values.restartIsTrue = false;
        this.values.trialIsTrue = true;
        this.setFairwayLimit();
        this.createIncrementOffsetTop();
        this.createRaindrop();
        this.elements.sounds[0].play();
    },

    startSingleNumber(e) {
        e.target.classList.toggle('active');
        this.values.selectedNumberType = 10;
    },

    startTwoDigitNumber(e) {
        e.target.classList.toggle('active');
        this.values.selectedNumberType = 100;
    },

    startLowLevel(e) {
        e.target.classList.toggle('active');
        this.values.selectedOperations = ['+', '-'];
    },

    hideEndingWindow() {
        if(this.values.raindropsArray.length) {
            return;
        }
        this.elements.endingWindowStatistic[0].innerText = `Score: ${this.elements.score[1].innerText || 0}`;
        this.elements.endingWindowStatistic[1].innerText = `Raindrops: ${this.values.raindropsCount}`;
        this.elements.endingWindow.style.visibility = this.elements.endingWindow.style.visibility === 'visible' ? 'hidden': 'visible';
        this.restart();
    },

    startHardLevel(e) {
        e.target.classList.toggle('active');
        this.values.selectedOperations = ['*', '/'];
    },

    createRaindrop() {
        if(this.values.movementDelay > 100) {
            this.values.movementDelay -= 10; 
        }
        if(this.values.creationDelay > 550) {
            this.values.creationDelay -= 50;
        }
        const raindrop = document.createElement('div');
        Math.round(Math.random() * 10) !== 10 ? raindrop.classList.add('main__gamezone__area__raindrop'): raindrop.classList.add('main__gamezone__area__raindrop', 'bonus');
        raindrop.style.left = `${this.getRandomOffsetLeft()}px`;
        raindrop.innerText = this.getRandomMathOperation();
        let raindropValue = raindrop.innerText.split(' ');
        raindrop.dataset.result = this.calculateRaindropValue(raindropValue);
        this.elements.area.append(raindrop);
        if(!this.values.raindropOffsetWidth) {
            this.values.raindropOffsetWidth = raindrop.offsetWidth;
        }
        this.values.raindropsArray.push(raindrop);
        this.moveRaindrop(raindrop, raindrop.offsetTop);
        this.values.timerCreation = setTimeout(() => this.createRaindrop(), this.values.creationDelay);
        if(this.values.trialIsTrue) {
            this.values.trialTimer = setTimeout(() => this.autoPlay(raindrop.dataset.result), this.createTrialDelay());
        }
        this.values.raindropsCount += 1;
    },

    autoPlay(result) {
        if(!this.values.trialIsTrue || this.values.lifeCounter === 3) {
            return;
        }
        const key1 = document.querySelector(`div[data-key="${this.keyCodeTemplate[result[0]]}"]`);
        const key2 = document.querySelector(`div[data-key="${this.keyCodeTemplate[result[1]]}"]`);
        key1.classList.add('active');
        if(key2) {
            key2.classList.add('active');
        }
        this.elements.input.innerText = result;
        setTimeout(() => this.scoreHandler(), 100);
    },

    toggleFullScreen() {
        if (!document.FullScreen) {
            document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
            document.webkitCancelFullScreen();
        }
    },

    moveRaindrop(raindrop, offsetTop) {
        if(this.values.lifeCounter === 3 || this.values.restartIsTrue) {
            this.values.raindropsArray.shift().remove();
            this.values.restartIsTrue || clearTimeout(this.values.timerCreation);
            this.hideEndingWindow();
            return;
        }
        [raindrop.style.top, offsetTop] = [offsetTop, `${raindrop.offsetTop + this.values.incrementOffsetTop}px`];
        let movementTimer = setTimeout(() => this.moveRaindrop(raindrop, offsetTop), this.values.movementDelay);
        raindrop.dataset.timer = movementTimer;
        if(raindrop.offsetTop >= this.values.fairwayLimit) {
            this.values.raindropsArray.shift().remove();
            this.elements.fairway.style.height = `${this.elements.fairway.offsetHeight + Math.round(0.19 * this.elements.fairway.offsetHeight)}px`;
            this.values.lifeCounter++;
            this.setFairwayLimit();
            clearTimeout(movementTimer);
        }
    },

    getRandomOffsetLeft() {
        return `${Math.floor(Math.random() * (this.elements.area.clientWidth - (this.values.raindropOffsetWidth || 80)))}`;
    },

    getRandomMathOperation() {
        let operation = this.values.selectedOperations[Math.round(Math.random())];
        let arrayOfNumber = [Math.floor(Math.random() * this.values.selectedNumberType), Math.floor(Math.random() * this.values.selectedNumberType)];
        if(operation === '-' || operation === '/') {
            arrayOfNumber.sort((a, b) => b - a);
            if(operation === '/') {
                [a, b] = arrayOfNumber;
                b = b === 0 ? 1: b;
                a = a % b === 0 ? a : a - (a % b);
                arrayOfNumber = [a, b];
            }
        }
        return `${arrayOfNumber[0]} ${operation} ${arrayOfNumber[1]}`;
    },

    setInputResult(e) {
        const key = document.querySelector(`div[data-key="${e.keyCode || e.target.dataset.key}"]`);
        if(!key) {
            return;
        }
        key.classList.add('active');
        switch(e.keyCode || parseInt(e.target.dataset.key)) {
            case 13:
                this.scoreHandler();
                break;
            case 127:
                this.clearInput();
                break;
            case 32:
                this.clearInput();
                break;
            default:
                this.elements.input.innerText += key.innerText;
                break;
        }

    },

    setFairwayLimit() {
        this.values.fairwayLimit = this.elements.area.clientHeight - (this.values.raindropOffsetWidth || 80)- this.elements.fairway.offsetHeight;
    },

    createIncrementOffsetTop() {
        this.values.incrementOffsetTop = this.elements.area.clientHeight * 0.12;
    },

    removeTransition(e) {
        e.target.classList.remove('active');
    },

    clearInput() {
        this.elements.input.innerText = '';
    },

    scoreHandler() {
        if(this.elements.input.innerText === this.values.raindropsArray[0].dataset.result) {
            this.soundsHandler(1);
            this.elements.score[1].innerText = parseInt(this.elements.score[1].innerText) + this.values.initialPoints || this.values.initialPoints;
            this.values.initialPoints++;
            this.addActiveClass(0);
            let raindropClassName = this.values.raindropsArray[0].className;
            if(raindropClassName.includes('bonus')){
                for(let i = 0; 0 < this.values.raindropsArray.length;) {
                    clearTimeout(this.values.raindropsArray[i].dataset.timer);
                    this.values.raindropsArray.shift().remove();
                }
                clearTimeout(this.values.trialTimer);
                this.elements.input.innerText = '';
            }else {
                clearTimeout(this.values.raindropsArray[0].dataset.timer);
                this.values.raindropsArray.shift().remove();
                this.elements.input.innerText = '';
            }
        }else{
            this.soundsHandler(2);
            this.addActiveClass(1);
            this.elements.input.innerText = '';
        }
    },

    calculateRaindropValue([a, operator, b]) {
        return this.calculator[operator](a,b);
    },

    soundsHandler(idx) {
        this.elements.sounds[idx].currentTime = 0;
        this.elements.sounds[idx].play();
    },
    
    addActiveClass(idx) {
        this.elements.score[idx].classList.add('active');
    },

    createTrialDelay() {
        return (this.elements.area.clientHeight - this.elements.fairway.offsetHeight) / 
        Math.round(1000 / this.values.movementDelay * this.values.raindropOffsetWidth) * 1000;
    }
}


window.addEventListener('DOMContentLoaded', Raindrop.initializeGame.bind(Raindrop));