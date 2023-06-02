function operate(n1, op, n2){
    n1 = Math.floor(parseFloat(n1) * 100) / 100;
    n2 = Math.floor(parseFloat(n2) * 100) / 100;
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
    screen.textContent += e.target.textContent;
}
function operateFirstTwoNum(e){
    operatorCount++;
    if(operatorCount !== 2) return;
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    screen.textContent += e.target.textContent;
    operatorCount--;
}
function resetValues(e){
    operatorCount = 0;
    screen.textContent = ""
}

const buttons = document.querySelectorAll(".screen-text");
const screen = document.querySelector(".screen");
const operators = document.querySelectorAll(".operator");
let operatorCount = 0;
operators.forEach(operator => operator.addEventListener("mouseup", operateFirstTwoNum));
buttons.forEach(button => button.addEventListener("mousedown", printScreen));
document.querySelector(".clear").addEventListener("mousedown", resetValues )
document.querySelector(".equals-to").addEventListener("mousedown", () => {
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
});