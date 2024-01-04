
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
let element = "";

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === '=') {
            string = calculate(string);
            input.value = string;
            console.log(input.value)
            localStorage.setItem(element, input.value);
            sessionStorage.setItem(element, input.value);
        } else if (e.target.innerHTML === 'AC') {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
            element = input.value;
        }
    });
});

function calculate(expression) {
    try {
        return Function('"use strict";return (' + expression + ')')();
    } catch (error) {
        return 'Error';
    }
}
function calculate(expression) {
    try {
        const postfixExpression = infixToPostfix(expression);
        console.log(postfixExpression);
        return evaluatePostfix(postfixExpression);
    } catch (error) {
        return 'Error';
    }
}

function infixToPostfix(infix) {
    const output = [];
    const operators = [];
    const precedence = { 
    "^": 3,
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1, };
    let temp = infix.match(/\d+|[/*+-]/g);
    temp.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token in precedence) {
            while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    });

    while (operators.length > 0) {
        output.push(operators.pop());
    }
    console.log(output);
    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];
    postfix.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    });

    return stack.pop();
}