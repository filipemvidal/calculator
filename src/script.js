function operate(num1, num2, operator)
{
    switch (operator)
    {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            throw TypeError(`${operator} is not a valid operator.`);
    }
}