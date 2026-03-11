const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const cache = [];
let clearDisplay = false, currentOperator = "";

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
            handleNumber(button);
            break;
        case "btn-operation":
            handleOperator(button);
            break;
        case "btn-especial":
            handleEspecial(button);
    }
}

function handleNumber(button) {
    if (clearDisplay) {
        display.textContent = "";
        clearDisplay = false;
    }

    if (display.textContent.length >= 10 || (button === '.' && display.textContent.includes('.')))
        return;

    if (button === '.' && display.textContent.length === 0)
        display.textContent = display.textContent + '0';


    display.textContent = display.textContent + button;

    if (typeof cache.at(-1) === "string" || cache.length === 0)
        cache.push(parseFloat(display.textContent));
    else
        cache[cache.length - 1] = parseFloat(display.textContent);
}


function handleOperator(button) {
    currentOperator = button;
    clearDisplay = true;

    if (cache.length > 0 && typeof cache.at(-1) !== "string")
        cache.push(button);
    else
        cache[cache.length - 1] = button;

    if (cache.length === 4) {
        cache[0] = operate(cache[0], cache[2], cache[1]);
        cache[1] = cache[3];
        cache.pop();
        cache.pop();
        displayNumber(cache[0]);
    }
}

function handleEspecial(button) {
    switch (button) {
        case "=":
            if (cache.length === 3) {
                cache[0] = operate(cache[0], cache[2], cache[1]);
                cache.pop();
                cache.pop();
                displayNumber(cache[0]);
            }
            break;
        case "C":
            cache.length = 0;
            clearDisplay = false;
            currentOperator = "";
            display.textContent = "";
            break;
        case "CE":
            if(typeof cache.at(-1) === "number")
                display.textContent = "";
            cache.pop();
    }
}

function displayNumber(number) {
    const number_str = number.toString();
    const digits = number_str.length;

    if(digits <= 10) {
        display.textContent = number;
    } else {
        if(number_str.indexOf(".") !== -1)
            display.textContent = number.toFixed(8);
        else
            display.textContent = "OVERFLOW";
    }
}