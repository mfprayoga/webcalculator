const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector('#displayNumber').innerHTML = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    }
    else {
            if (calculator.displayNumber === '0') {
                calculator.displayNumber = digit;
            }
            else {
                calculator.displayNumber += digit;
            }
    }
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber *= -1;
}

function showCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }
    
    let result = 0;
    if (calculator.operator == "*") {
        result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
    }
    else if (calculator.operator == "/") {
        result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
    }
    else if (calculator.operator == "+") {
        result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
    }
    else if (calculator.operator == "-") {
        result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    }
    else {
        result = parseFloat(calculator.displayNumber) % parseFloat(calculator.displayNumber);
    }
    
    const history = {
       firstNumber: calculator.firstNumber,
       secondNumber: calculator.displayNumber,
       operator: calculator.operator,
       result: result
    }
    
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    }
    else {
        alert('Operator telah ditetapkan');
    }
}

function decimalNumber(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = "0.";
    }
    else {
        calculator.displayNumber += ".";
    }
}

const buttons = document.querySelectorAll('.button');

for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;
        
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('equals')) {
            showCalculation();
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('dot')) {
            decimalNumber();
            updateDisplay();
            return;
        }
        
        inputDigit(target.innerText);
        updateDisplay();
    })
}
