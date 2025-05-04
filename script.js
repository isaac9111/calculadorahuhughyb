const currDisplay = document.querySelector("#curr-display");
const prevDisplay = document.querySelector("#prev-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");
const toggle = document.getElementById("theme-toggle");
let operation;

function appendNumber(number) {
    if (number === "." && currDisplay.innerText.includes(".")) return;
    currDisplay.innerText += number;
}

function chooseOperation(operand) {
    if (currDisplay.innerText === "") return;
    if (prevDisplay.innerText !== "") {
        compute(operation);
    }
    operation = operand;
    prevDisplay.innerText = currDisplay.innerText + " " + operand;
    currDisplay.innerText = "";
}

function clearDisplay() {
    currDisplay.innerText = "";
    prevDisplay.innerText = "";
    operation = undefined;
}

function compute(operand) {
    const previousValue = parseFloat(prevDisplay.innerText);
    const currentValue = parseFloat(currDisplay.innerText);
    if (isNaN(previousValue) || isNaN(currentValue)) return;

    let result;
    switch (operand) {
        case "+": result = previousValue + currentValue; break;
        case "-": result = previousValue - currentValue; break;
        case "*": result = previousValue * currentValue; break;
        case "/": result = previousValue / currentValue; break;
        default: return;
    }

    currDisplay.innerText = result;
    prevDisplay.innerText = "";
    operation = undefined;
}

numbers.forEach((number) => {
    number.addEventListener("click", () => appendNumber(number.innerText));
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => chooseOperation(operator.innerText));
});

clearBtn.addEventListener("click", clearDisplay);
equalBtn.addEventListener("click", () => compute(operation));
deleteBtn.addEventListener("click", () => {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
});

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});
