// Select necessary elements
const display = document.getElementById('display');
const calculator = document.getElementById('calculator');
const clearButton = document.getElementById('clear');

// Calculator state
let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

// Update the display
function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

// Handle number and decimal input
function handleNumber(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay();
}

// Handle operator input
function handleOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    operator = op;
    previousInput = currentInput || previousInput;
    currentInput = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Perform calculation
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) {
        alert("Invalid input");
        resetCalculator();
        return;
    }

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                resetCalculator();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Reset the calculator
function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Event delegation for calculator buttons
calculator.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('btn')) return;

    const value = target.textContent.trim();

    if (/\d/.test(value) || value === '.') {
        handleNumber(value);
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        handleOperator(value);
    } else if (value === '=') {
        calculate();
    }
});

// Clear button event listener
clearButton.addEventListener('click', resetCalculator);

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key) || key === '.') {
        handleNumber(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (key.toLowerCase() === 'c') {
        resetCalculator();
    }
});

// Initialize display
updateDisplay();
