const displayNumber = document.getElementById('displayNumber');
const displaySign = document.getElementById('displaySign');


const numericButtons = document.querySelectorAll('.numeric-buttons button');
const operationsButtons = document.querySelectorAll('.operations-buttons button');
let firstValue = '';
let result = '';
let firstSavedValue = '';
let sumResult;
let sumPressed;

handleNumericButtons(numericButtons);
handleOperatorButtons(operationsButtons);

function handleNumericButtons (id){
    id.forEach( button => {
        button.addEventListener('click', 
        () => {
            //console.log(button.value);
            firstValue += button.value;          
            displayNumber.textContent = `${firstValue}`
            
            console.log(firstValue);
        }
        );
    });
}


function handleOperatorButtons (id){
    id.forEach( button => {
        button.addEventListener('click',
        () => {
            switch (button.id){
                case 'sum':
                    operations[4].evaluation()
                    defineOperationLogic('sum', 0, button);
                break;
             case 'subtraction':
                    operations[4].evaluation()
                    defineOperationLogic('subtraction', 1, button);
                break;    
             case 'multiplication':
                    operations[4].evaluation()
                    defineOperationLogic('multiplication', 2, button);
                break;
             case 'division':
                    operations[4].evaluation()
                    defineOperationLogic('division', 3, button);
                break;
             case 'pow':
                    // operations[4].evaluation()
                    // defineOperationLogic('pow', 6, button);
                break;   
             case 'equal':  
                    operations[4].evaluation();
                break;
             case 'changeSign':
                    handleSign(button);
                break;
             case 'erase':
             if(firstValue != ''){
                firstValue = firstValue.slice(0,-1);
                displayNumber.textContent = `${firstValue}`;
             }       
                break;
             case 'clear':
                    firstValue = '';
                    result = '';
                    displayNumber.textContent = '';
            }
        })
    })
};

function handleSign(button){
    if(firstValue == '' && result == ''){
        if (!operations[5].isPressed) {
            operations[5].isPressed = true;
            displaySign.textContent = `${button.value}`
        } else {
            operations[5].isPressed = false;
            displaySign.textContent = '';
        } 
    } else if (firstValue != '' && result == ''){
        operator('changeSign');
    } else if(firstValue == '' && result != '') {
        result = operations[5].changeSign(result);
        displayNumber.textContent = `${result}`;
    }
}




const operations = [{
    id: 'sum',
    isPressed: null,
    sum(firstValue, secondValue) {
        return firstValue + secondValue;
    }
}, {
    id: 'subtraction',
    isPressed: null,
    subtraction(firstValue, secondValue) {
        return firstValue - secondValue;
    }
}, {
    id: 'multiplication',
    isPressed: null,
    multiplication(firstValue, secondValue) {
        return firstValue * secondValue;
    }
}, {
    id: 'division',
    isPressed: null,
    division(firstValue, secondValue) {
        return firstValue / secondValue;
    }
}, {
    id: 'evaluation',
    isPressed: null,
    evaluation() {
        operations.filter(pressed => {
            if (pressed.isPressed === true) {
                //console.log(`button pressed: ${pressed.id}`);
                return operator(`${pressed.id}`);
            }
        })

    }
},
{
    id: 'changeSign',
    isPressed: null,
    changeSign(value) {
        displaySign.textContent = '';
        return value * (-1);
    }
},
{
    id: 'pow',
    isPressed: null,
    pow(value){
        return value**2;
    }
},
];





function defineOperationLogic(operation, operationsArrayId, button) {
    console.log(`${operations[operationsArrayId].isPressed}`);
    if (result != '' && firstValue != '') {
        operator(operation);
    } else if (result != '' && firstValue == '') {
        result = result;
        console.log(`result: ${result}`);
        firstValue = '';
        operations[operationsArrayId].isPressed = true;
    } else {
        result = +firstValue;
        console.log(`result: ${result}`);
        firstValue = '';
        operations[operationsArrayId].isPressed = true;
    }
}

function operator(id) {
    switch (id) {
        case 'sum':
            firstValue = +firstValue;
            result = operations[0].sum(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`
            operations[0].isPressed = false;
            break;
        case 'subtraction':
            firstValue = +firstValue;
            result = operations[1].subtraction(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`
            operations[1].isPressed = false;
            break;
        case 'multiplication':
            firstValue = +firstValue;
            result = operations[2].multiplication(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`
            operations[2].isPressed = false;
            break;
        case 'division':
            firstValue = +firstValue;
            result = operations[3].division(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`
            operations[3].isPressed = false;
            break;
        case 'changeSign':
            firstValue = +firstValue;
            result = operations[5].changeSign(firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`;
            operations[5].isPressed = false;
            break;
        case 'pow':
            firstValue = +firstValue;
            result = operations[6].pow(firstValue);
            firstValue = '';
            displayNumber.textContent = `${result}`;
            operations[6].isPressed = false;
            break;
    }
};

