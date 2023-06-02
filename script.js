function operate(n1, op, n2){
    n1 = Math.floor(parseFloat(n1) * 100) / 100;
    n2 = Math.floor(parseFloat(n2) * 100) / 100;
    Number.isNaN(n2)? n2 = n1: n2 = n2;
    this.calc = {
        "+":  (a, b) => a + b,
        "-":  (a, b) => a - b,
        "*":  (a, b) => a * b,
        "/":  (a, b) => a / b,
        "**": (a, b) => a ** b,
        "%":  (a, b) => a % b,
    }
    screen.textContent = this.calc[op](n1, n2)
}
function printScreen(e){
    if(e.target.textContent === ".") e.target.removeEventListener("mousedown", printScreen);
    screen.textContent += e.target.textContent;
}
function operateFirstTwoNum(e){
    operatorCount++;
    dot.addEventListener("mousedown", printScreen);
    if(operatorCount !== 2) return;
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    screen.textContent += e.target.textContent;
    operatorCount--;
}
function resetValues(e){
    operatorCount = 0;
    screen.textContent = "";
}

const buttons = document.querySelectorAll(".screen-text");
const screen = document.querySelector(".screen");
const operators = document.querySelectorAll(".operator");
const dotButton = document.querySelector("#dot");
let operatorCount = 0;
operators.forEach(operator => operator.addEventListener("mouseup", operateFirstTwoNum));
buttons.forEach(button => button.addEventListener("mousedown", printScreen));
document.querySelector(".clear").addEventListener("mousedown", resetValues )
document.querySelector(".equals-to").addEventListener("mousedown", () => {
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
});