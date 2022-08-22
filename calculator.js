const numberButtons = document.querySelectorAll('.numberButton');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
let displayText = "";
let isOperatorClicked = false;
let inputs = [];
const operatorList = ["+", "-", "/", "X"];
function add (a,b) {
	return a+b;
};

function subtract(a,b) {
	return a-b;
};

function multiply(a,b) {
	return a*b;
};
function divide(a,b) {
	return a/b;
};

function operate (a, b, operator) {
    switch (operator) {
        case '+':
        return add(a, b);
           break;
        case '-':
            return subtract(a,b);
            break;
        case 'X':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            console.log("default worked")
            break;
    }
}


function getInput(value, isOperator){
    if (value == "=") {
        let lastIndex = inputs.length - 1;
        let result = operate(inputs[lastIndex-2], inputs[lastIndex], inputs[lastIndex-1]);
        displayText = result;
        display.innerHTML = displayText;
        inputs.push(result);
        return;
    }
    if(!inputs.length){ //when list is empty
        isOperator ? "": inputs.push(value);
    } 
    else if(operatorList.includes(inputs[inputs.length-1]) && isOperator){
        console.log("inn")
        inputs[inputs.length-1] = value;
    }
    else if(!operatorList.includes(inputs[inputs.length-1]) && !isOperator){
        inputs[inputs.length-1] += value;
    }
    else inputs.push(value);
}

function deactivateOperators(){
    operatorButtons.forEach(operator=>{
        operator.classList.remove('active');
    })
}

numberButtons.forEach(button=>{
    button.addEventListener('click', (event) => {
        deactivateOperators();
        if (isOperatorClicked) displayText = "";
        displayText += event.target.value;
        display.innerHTML = displayText;
        isOperatorClicked = false;
        getInput(event.target.value, false);
    })
})

operatorButtons.forEach(operator=>{
    operator.addEventListener('click', event=>{
        deactivateOperators();
        event.target.classList.add('active');
        isOperatorClicked = true;
        getInput(event.target.value, true);
    })
})

buttondelete.addEventListener('click', event => {
    displayText = displayText.slice(0, -1);
    display.innerHTML = displayText;
    inputs.push(inputs.pop().slice(0, -1));
})