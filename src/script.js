const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
let cache = 0, clearDisplay = false, currentOperator = "";

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "X":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            throw TypeError(`${operator} is not a valid operator.`);
    }
}

buttons.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    handleButton(e.target.textContent, e.target.classList[0]);
});

function handleButton(button, btn_class) {
    switch (btn_class) {
        case "btn-number":
            displayNumber(button);
            break;
        case "btn-operation":
            handleOperator(button);
            break;
        case "btn-especial":
            handleEspecial(button);
    }
}

function displayNumber(button) {
    if (display.textContent.length >= 10 || (button === '.' && display.textContent.includes('.')))
        return;

    if (button === '.' && display.textContent.length === 0)
        display.textContent = display.textContent + '0';

    if (clearDisplay) {
        display.textContent = "";
        clearDisplay = false;
    }

    display.textContent = display.textContent + button;
}


function handleOperator(button) {
    currentOperator = button;
    clearDisplay = true;

    if (cache === 0) {
        cache = parseFloat(display.textContent);
    } else {
        let cache2 = parseFloat(display.textContent);
        let result = operate(cache, cache2, currentOperator);
        cache = result;
        display.textContent = result;
    }
}

function handleEspecial(button) {
    switch (button) {
        case "=":
            let cache2 = parseFloat(display.textContent);
            let result = operate(cache, cache2, currentOperator);
            cache = result;
            display.textContent = result;
            break;
    }
}