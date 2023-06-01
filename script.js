function operate(n1, n2, op){
    this.calc = {
        "+":  (a, b) => a+b,
        "-":  (a, b) => a-b,
        "*":  (a, b) => a*b,
        "/":  (a, b) => a/b,
        "**": (a, b) => a**b,
        "%":  (a, b) => a%b,
    }
    return this.calc[op](n1, n2)
}
function printScreen(e){
    screen.textContent += e.target.textContent;
}

const buttons = document.querySelectorAll(".screen-text");
const screen = document.querySelector(".screen");
buttons.forEach(button => button.addEventListener("mousedown", printScreen));
document.querySelector(".clear").addEventListener("mousedown", () => screen.textContent = "")