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
    compute();
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

function compute() {
  const previous = parseFloat(prevDisplay.innerText);
  const current = parseFloat(currDisplay.innerText);
  if (isNaN(previous) || isNaN(current)) return;

  let result;
  switch (operation) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      return;
  }

  const expression = `${previous} ${operation} ${current}`;
  currDisplay.innerText = result;
  prevDisplay.innerText = "";
  saveToHistory(expression, result);
  operation = undefined;
}

function saveToHistory(expression, result) {
  const historyItem = `${expression} = ${result}`;
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(historyItem);
  history = history.slice(0, 10);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("history");
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Event Listeners
numbers.forEach(button => button.addEventListener("click", () => appendNumber(button.innerText)));
operators.forEach(button => button.addEventListener("click", () => chooseOperation(button.innerText)));
clearBtn.addEventListener("click", clearDisplay);
equalBtn.addEventListener("click", compute);
deleteBtn.addEventListener("click", () => {
  currDisplay.innerText = currDisplay.innerText.slice(0, -1);
});
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
});

renderHistory();
