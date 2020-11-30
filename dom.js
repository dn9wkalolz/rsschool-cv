let a = null;
let b = null;
let operation = null;
let index = null; // счётчик на мат. операции, если произошла то 1, если нет то 0

const resultDiv = document.getElementById('result');
const historyValue = document.getElementById('history');

const digit1Button = document.getElementById('digit1');
const digit2Button = document.getElementById('digit2');
const digit3Button = document.getElementById('digit3');
const digit4Button = document.getElementById('digit4');
const digit5Button = document.getElementById('digit5');
const digit6Button = document.getElementById('digit6');
const digit7Button = document.getElementById('digit7');
const digit8Button = document.getElementById('digit8');
const digit9Button = document.getElementById('digit9');
const digit0Button = document.getElementById('digit0');
const dotButton = document.getElementById('dot');

const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const mulButton = document.getElementById('mul');
const divButton = document.getElementById('div');
const sqButton = document.getElementById('sq');
const sqrButton = document.getElementById('sqr');
const calculateButton = document.getElementById('calculate');

const eraseButton = document.getElementById('erase');
const resetButton = document.getElementById('reset');

digit1Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 1;
});

digit2Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 2;
});

digit3Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 3;
});

digit4Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 4;
});

digit5Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 5;
});

digit6Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 6;
});

digit7Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 7;
});

digit8Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 8;
});

digit9Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 9;
});

digit0Button.addEventListener('click', function() {
    if(index == 1) {
        resultDiv.value = ''
        index = 0;
    }
    resultDiv.value += 0;
});

dotButton.addEventListener('click', function() {
    if(resultDiv.value.indexOf('.') === -1) {
        if(resultDiv.value === '') {
            resultDiv.value = '0.';
        } else {
            resultDiv.value += '.';
        }
    }
})

addButton.addEventListener('click', function(){
    if(operation == add) {
        if(a != null && resultDiv.value != '' && index != 1) {
            b = parseFloat(resultDiv.value);
            historyValue.innerHTML += b + '+';
            resultDiv.value = calculate(operation, a, b);
            index = 1;
            a = parseFloat(resultDiv.value);
            b = null;
        } else {
            a = a;
        }
    } else {    
        a = (resultDiv.value == '') ? a : parseFloat(resultDiv.value);
        operation = add;
        resultDiv.value = '';
        historyValue.innerHTML = a + '+';
    }
});

subButton.addEventListener('click', function() {
    if(operation == sub) {
        if(a != null && resultDiv.value != '' && index != 1) {
            b = parseFloat(resultDiv.value);
            historyValue.innerHTML += b + '-';
            resultDiv.value = calculate(operation, a, b);
            index = 1;
            a = parseFloat(resultDiv.value);
            b = null;
        } else {
            a = a;
        }
    } else {    
        a = (resultDiv.value == '') ? a : parseFloat(resultDiv.value);
        operation = sub;
        resultDiv.value = '';
        historyValue.innerHTML = a + '-';
    }
});

mulButton.addEventListener('click', function() {
    if(operation == mul) {
        if(a != null && resultDiv.value != '' && index != 1) {
            b = parseFloat(resultDiv.value);
            historyValue.innerHTML += b + '×';
            resultDiv.value = calculate(operation, a, b);
            index = 1;
            a = parseFloat(resultDiv.value);
            b = null;
        } else {
            a = a;
        }
    } else {    
        a = (resultDiv.value == '') ? a : parseFloat(resultDiv.value);
        operation = mul;
        resultDiv.value = '';
        historyValue.innerHTML = a + '×'
    }
});

divButton.addEventListener('click', function() {
    if(operation == div) {
        if(a != null && resultDiv.value != '' && index != 1) {
            b = parseFloat(resultDiv.value);
            historyValue.innerHTML += b + '÷';
            resultDiv.value = calculate(operation, a, b);
            index = 1;
            a = parseFloat(resultDiv.value);
            b = null;
        } else {
            a = a;
        }
    } else {    
        a = (resultDiv.value == '') ? a : parseFloat(resultDiv.value);
        operation = div;
        resultDiv.value = '';
        historyValue.innerHTML = a + '÷';
    }
});

sqButton.addEventListener('click', function() {
    a = parseFloat(resultDiv.value);
    operation = sq;
    resultDiv.value = calculate(operation, a);
    historyValue.innerHTML = a + '×' + a;
    a = null;
    b = null;
    operation = null;
});

sqrButton.addEventListener('click', function() {
    a = parseFloat(resultDiv.value);
    operation = sqr;
    resultDiv.value = calculate(operation, a);
    historyValue.innerHTML = a + '**' + 0.5;
    a = null;
    b = null;
    operation = null;
});

calculateButton.addEventListener('click', function() {
    if(a == null) {
        index = 1;
        resultDiv.value = 'Enter number';
    } else {
        b = (resultDiv.value == '') ? null: parseFloat(resultDiv.value);
        if(b == 0 && operation == div) {
            resultDiv.value = 'Eror!';
        } else if(b == null) {
            resultDiv.value = 'Eror!'
        } else {
        historyValue.innerHTML += b + ' = ';
        resultDiv.value = calculate(operation, a, b);
        a = null;
        b = null;
        operation = null;
        index = 1;
        }
    }
});

eraseButton.addEventListener('click', function() {
    resultDiv.value = resultDiv.value.substring(0, resultDiv.value.length - 1);
});

resetButton.addEventListener('click', function() {
    historyValue.innerHTML = '';
    resultDiv.value = '';
    a = null;
    b = null;
    index = 0;
    operation = null;
})

