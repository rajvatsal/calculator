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
    operators.forEach(operator => operator.removeEventListener('mousedown', operateFirstTwoNum));
    screen.textContent += e.target.textContent;
}
function operateFirstTwoNum(){
    if(screen.textContent === "") return
    operatorCount++;
    if(operatorCount !== 2) return
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
    screen.textContent = "";
    //Remove existing eventListeners
    operators.forEach(operator => operator.removeEventListener('mousedown', printOperators));
    operators.forEach(operator => operator.removeEventListener('mousedown', operateFirstTwoNum));
    numbers.forEach(number => number.removeEventListener('mousedown', printNumber));
    //Add new eventListeners
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    numbers.forEach(number => number.addEventListener('mousedown', printNumber));
}
function getRickRolled(){
    let vid = document.createElement('video');
    let src = document.createElement('source');
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    vid.setAttribute('height', '100%');
    vid.setAttribute('width', '100%');
    vid.setAttribute('loop', '');
    src.setAttribute('src', './pics-vids/get-rick-rolled.mp4');
    vid.appendChild(src);
    body.insertBefore(vid, header);
    vid.play();
    window.addEventListener('keydown', removeRickRoll);
}
function removeRickRoll(e) {
    if(e.code === "Escape" || e.code === "Enter" || e.code === "Space"){
        let body = document.querySelector('body');
        let vid = document.querySelector('video');
        body.removeChild(vid);
        window.removeEventListener('keydown', removeRickRoll)
    }
}

let operatorCount = 0;
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const dotButton = document.querySelector('#dot');

operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
numbers.forEach(number => number.addEventListener('mousedown', printNumber));

document.querySelector('.clear').addEventListener('mousedown', resetValues )
document.querySelector('.equals-to').addEventListener('mousedown', () => {
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    if(screen.textContent === "") resetValues();
});