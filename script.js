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