function operate(n1, op, n2){
    //change from string to float values so this.calc doesn't work with strings
    n1 = parseFloat(n1), n2 = parseFloat(n2);
    this.calc = {
        "+":  (a, b) => a + b,
        "-":  (a, b) => a - b,
        "*":  (a, b) => Math.floor((a * b) * 100) / 100,
        "/":  (a, b) => b === 0? getRickRolled(): Math.floor((a / b) * 100) / 100, //If dividing by 0 then getRickRolled
        "**": (a, b) => a ** b,
        "%":  (a, b) => a % b,
        "undefined": () => NaN,
    }
    //When user enters incomplete operation eg: 5 +
    let result = this.calc[op](n1, n2);
    if(Number.isNaN(result)){
        alert("ERROR");
        resetValues();
    }else 
        screen.textContent = result;
}
function printNumber(e){
    if(e.target.textContent === ".") e.target.removeEventListener('mousedown', printNumber);
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    screen.textContent += e.target.textContent;
}
function printOperators(e){
    if(!screen.textContent) return
    dotButton.addEventListener('mousedown', printNumber);
    operators.forEach(operator => operator.removeEventListener('mousedown', printOperators));
    operators.forEach(operator => operator.removeEventListener('mousedown', operateFirstTwoNum));
    screen.textContent += e.target.textContent;
}
function operateFirstTwoNum(){
    //Don't mutate operatorCount if there is nothing on the screen
    if(!screen.textContent) return
    operatorCount++;
    if(operatorCount !== 2) return
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    if(!screen.textContent) {
        resetValues();
        return
    }
    operatorCount--;
}
function resetValues(){
    operatorCount = 0;
    screen.textContent = "";
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    numbers.forEach(number => number.addEventListener('mousedown', printNumber));
}
function getRickRolled(){
    let vid = document.createElement('video');
    let src = document.createElement('source');
    let main = document.querySelector('main');
    vid.setAttribute('height', '100%');
    vid.setAttribute('width', '100%');
    vid.setAttribute('loop', '');
    src.setAttribute('src', './pics-vids/get-rick-rolled.mp4');
    vid.appendChild(src);
    main.insertBefore(vid, screen);
    vid.play();
    window.addEventListener('keydown', removeRickRoll);
    resetValues();
}
function removeRickRoll(e) {
    if(e.code === "Escape" || e.code === "Enter" || e.code === "Space"){
        let main = document.querySelector('main');
        let vid = document.querySelector('video');
        main.removeChild(vid);
        window.removeEventListener('keydown', removeRickRoll);
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

document.querySelector('.clear').addEventListener('mousedown', resetValues)
document.querySelector('.equals-to').addEventListener('mousedown', () => {
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    //If you got rickRolled or gave invalid input reset everything
    if(!screen.textContent) resetValues();
});