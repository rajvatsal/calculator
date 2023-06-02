function operate(n1, op, n2){
    n1 = Math.floor(parseFloat(n1) * 100) / 100;
    n2 = Math.floor(parseFloat(n2) * 100) / 100;
    this.calc = {
        "+":  (a, b) => a + b,
        "-":  (a, b) => a - b,
        "*":  (a, b) => Math.floor((a * b) * 100) / 100,
        "/":  (a, b) => {
            if(b === 0) getRickRolled();
            else  return Math.floor((a / b) * 100) / 100;
        },
        "**": (a, b) => a ** b,
        "%":  (a, b) => a % b,
    }
    screen.textContent = this.calc[op](n1, n2);
}
function printNumber(e){
    if(e.target.textContent === ".") e.target.removeEventListener('mousedown', printNumber);
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    screen.textContent += e.target.textContent;
}
function printOperators(e){
    if(screen.textContent === "") return
    dotButton.addEventListener('mousedown', printNumber);
    operators.forEach(operator => operator.removeEventListener('mousedown', printOperators));
    screen.textContent += e.target.textContent;
}
function operateFirstTwoNum(){
    operatorCount++;
    if(screen.textContent === "") return
    if(operatorCount !== 2) {
        operators.forEach(operator => operator.removeEventListener('mousedown', operateFirstTwoNum));
        return
    }
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    if(screen.textContent === "") {
        resetValues();
        return
    }
    operatorCount--;
}
function resetValues(){
    operatorCount = 0;
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    numbers.forEach(number => number.addEventListener('mousedown', printNumber));
    screen.textContent = "";
}
function getRickRolled(){
    let vid = document.createElement('video');
    let src = document.createElement('source');
    let main = document.querySelector('main');
    vid.setAttribute('height', '100%');
    vid.setAttribute('width', '100%');
    src.setAttribute('src', './pics-vids/get-rick-rolled.mp4');
    vid.appendChild(src);
    //main.insertBefore(vid, screen);
    //vid.play();
    //vid.addEventListener('ended', () => main.removeChild(vid));
}

const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const dotButton = document.querySelector('#dot');
let operatorCount = 0;
operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
numbers.forEach(number => number.addEventListener('mousedown', printNumber));
document.querySelector('.clear').addEventListener('mousedown', resetValues )
document.querySelector('.equals-to').addEventListener('mousedown', () => {
    let calculateString = screen.textContent.split(' ');
    operate(...calculateString);
});