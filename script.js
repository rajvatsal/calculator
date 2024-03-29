function operate(n1, op, n2){
    //change from string to float values so this.calc doesn't work with strings
    n1 = parseFloat(n1), n2 = parseFloat(n2);
    if(op === "/" && n2 === 0){
        getRickRolled();
        return
    }
    this.calc = {
        "+":  (a, b) => a + b,
        "-":  (a, b) => a - b,
        "*":  (a, b) => a * b,
        "/":  (a, b) => a / b,
        "**": (a, b) => a ** b,
        "%":  (a, b) => a % b,
        "undefined": () => NaN,
    }
    //When user enters incomplete operation eg: 5 +
    let result = Math.floor((this.calc[op](n1, n2)) * 100) / 100;
    if(Number.isNaN(result)){
        alert("ERROR");
        resetValues();
    }else 
        screen.textContent = result;
}
function printNumber(e){
    if(e.target.textContent === '.') e.target.removeEventListener('mousedown', printNumber);
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
    screen.textContent = '';
    operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
    operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
    numbers.forEach(number => number.addEventListener('mousedown', printNumber));
}
function getRickRolled(){
    let vid = document.createElement('video');
    let src = document.createElement('source');
    let main = document.querySelector('main');
    vid.setAttribute('height', '100%');
    vid.setAttribute('style', 'padding-bottom: 30px;')
    vid.setAttribute('width', '100%');
    vid.setAttribute('loop', '');
    src.setAttribute('src', './pics-vids/get-rick-rolled.mp4');
    vid.appendChild(src);
    main.insertBefore(vid, screen);
    vid.play();
    window.addEventListener('keydown', removeRickRoll);
}
function removeRickRoll(e) {
    if(e.code === "Escape" || e.code === "Enter" || e.code === "Space"){
        let main = document.querySelector('main');
        let vid = document.querySelector('video');
        main.removeChild(vid);
        resetValues();

        window.removeEventListener('keydown', removeRickRoll);
    }
}
function changeColor(e){
    e.target.classList.add('hover');
}
function removeColor(e){
    e.target.classList.remove('hover');
}
function popLastCharacter(){
    let arr = screen.textContent.split("");
    let last = arr.pop();
    if(last === " "){
        arr.splice(arr.length - 2, 2);
        operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
        operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
        operatorCount--;
        dotButton.removeEventListener('mousedown', printNumber);
    }else if(last === ".")
        dotButton.addEventListener('mousedown', printNumber);
    screen.textContent = arr.join("");
}

let operatorCount = 0;
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const operators = document.querySelectorAll('.operator');
const dotButton = document.querySelector('#dot');
const buttons = document.querySelectorAll('button');
const del = document.querySelector('.del');

operators.forEach(operator => operator.addEventListener('mousedown', operateFirstTwoNum));
operators.forEach(operator => operator.addEventListener('mousedown', printOperators));
numbers.forEach(number => number.addEventListener('mousedown', printNumber));

document.querySelector('.clear').addEventListener('mousedown', resetValues)
document.querySelector('.equals-to').addEventListener('mousedown', () => {
    let calculateString = screen.textContent.split(" ");
    operate(...calculateString);
    //If you got rickRolled or gave invalid input reset everything otherwise reset operatorCount to 0
    !screen.textContent? resetValues(): operatorCount = 0;
});
buttons.forEach(button => button.addEventListener('mouseover', changeColor));
buttons.forEach(button => button.addEventListener('mouseleave', removeColor));

del.addEventListener('mousedown', popLastCharacter);