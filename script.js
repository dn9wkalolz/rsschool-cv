const Keyboard = {
    layout: {
        keyboardWrapper: null,
        keyboardContainer: null,
        buttons: null
    },

    property: {
        value: null,
        isCapsLockTrue: false
    },

    inputHandler: null,

    createIcon(name) {
        return `<span class='material-icons'>${name}</span>`;
    },

    createButtons() {
        const buttonsArray = [];
        const buttonsSet = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];
        const specialButton = ['backspace', 'p', 'enter', '?'];
        buttonsSet.forEach(button => {
            const buttonsElement = document.createElement('button');
            let specialButtonIsTrue = specialButton.indexOf(button) !== -1;
            switch(button) {
                case 'backspace':
                    buttonsElement.innerHTML = this.createIcon('backspace');
                    buttonsElement.classList.add('keyboard__key--wide', 'keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.property.value = this.property.value.substr(0, this.property.value.length - 1);
                        this.inputHandler(this.property.value);
                    });
                    break;
                case 'caps':
                    buttonsElement.innerHTML = this.createIcon('keyboard_capslock');
                    buttonsElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.capsLockCheck();
                        buttonsElement.classList.toggle('keyboard__key--active');
                    });
                    break;
                case 'enter':
                    buttonsElement.innerHTML = this.createIcon('keyboard_return');
                    buttonsElement.classList.add('keyboard__key--wide', 'keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.property.value += '\n';
                        this.inputHandler(this.property.value);
                    });
                    break;
                case 'done':
                    buttonsElement.innerHTML = this.createIcon('check_circle');
                    buttonsElement.classList.add('keyboard__key--wide', 'keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.layout.keyboardWrapper.classList.add('keyboard--hidden');
                    });
                    break;
                case 'space':
                    buttonsElement.innerHTML = this.createIcon('space_bar');
                    buttonsElement.classList.add('keyboard__key--extra-wide', 'keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.property.value += ' ';
                        this.inputHandler(this.property.value);
                    });
                    break;
                default:
                    buttonsElement.innerHTML = button;
                    buttonsElement.classList.add('keyboard__key');
                    buttonsElement.addEventListener('click',() => {
                        this.property.value += this.property.isCapsLockTrue ? button.toUpperCase() : button.toLowerCase();
                        this.inputHandler(this.property.value);
                    });
                    break;               
            }
            buttonsArray.push(buttonsElement);
            if(specialButtonIsTrue) {
                buttonsArray.push(document.createElement('br'));
            }
        })
        return buttonsArray;
    },
    
    createKeyboard() {
        this.layout.keyboardWrapper = document.createElement('div');
        this.layout.keyboardContainer = document.createElement('div');
        this.layout.keyboardWrapper.classList.add('keyboard', 'keyboard--hidden');
        this.layout.keyboardContainer.classList.add('keyboard__keys');
        this.layout.keyboardContainer.append(...this.createButtons());
        this.layout.buttons = this.layout.keyboardContainer.querySelectorAll('.keyboard__key');
        this.layout.keyboardWrapper.append(this.layout.keyboardContainer);
        return this.layout.keyboardWrapper;
    },

    keyboardStart() {
        const inputFields = document.querySelectorAll('.use-keyboard-input');
        document.body.prepend(this.createKeyboard());
        inputFields.forEach(field => 
        field.addEventListener('focus', () => {
            this.layout.keyboardWrapper.classList.remove('keyboard--hidden');
            this.scanValue(field.value, currentValue => {
                field.value = currentValue;
            });
        })
        );
    },

    scanValue(fieldValue, func) {
        this.property.value = fieldValue || '';
        this.inputHandler = func;
    },

    capsLockCheck() {
        this.property.isCapsLockTrue = !this.property.isCapsLockTrue;
        this.layout.buttons.forEach(button => {
            if(button.childElementCount === 0) {
                button.textContent = this.property.isCapsLockTrue ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
            }
        })
    }
}

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.keyboardStart();
});