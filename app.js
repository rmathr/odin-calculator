const displayNumber = document.getElementById('displayNumber');
const displaySign = document.getElementById('displaySign');


const numericButtons = document.querySelectorAll('.numeric-buttons button');
const operationsButtons = document.querySelectorAll('.operations-buttons button');
let firstValue = '';
let result = '';
let firstSavedValue = '';
let sumResult;
let sumPressed;
let roundResult = '';

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
                    defineBasicOperationLogic('sum', 0, button);
                break;
             case 'subtraction':
                    operations[4].evaluation()
                    defineBasicOperationLogic('subtraction', 1, button);
                break;    
             case 'multiplication':
                    operations[4].evaluation()
                    defineBasicOperationLogic('multiplication', 2, button);
                break;
             case 'division':
                    operations[4].evaluation()
                    defineBasicOperationLogic('division', 3, button);
                break;
             case 'pow':
                    operations[4].evaluation()
                    handlePow();
                break;
             case 'squareRoot':
                    operations[4].evaluation()
                    handleSqrt();
                break;
             case 'dot':
                    defineDecimalNumber(); 
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
        // displayNumber.textContent = `${result}`;
        displayNumber.textContent = `${roundDisplayResult(result)}`;
    }
}

function handlePow(){
    if (firstValue != '' && result == ''){
        operator('pow');
    }  else if (firstValue == '' && result != ''){
        result = operations[6].pow(result);
        displayNumber.textContent = `${roundDisplayResult(result)}`;
        // displayNumber.textContent = `${result}`;
        operations[6].isPressed = false;
    }
}

function handleSqrt(){
    if (firstValue != '' && result == ''){
        operator('squareRoot');
    }  else if (firstValue == '' && result != ''){
        result = operations[7].squareRoot(result);
        displayNumber.textContent = `${roundDisplayResult(result)}`;
        // displayNumber.textContent = `${result}`;
        operations[6].isPressed = false;
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
        // if (secondValue == 0){
        //     return "ERROR, CAN'T DIVIDE BY ZERO."
        // } 
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
{
    id: 'squareRoot',
    isPressed: null,
    squareRoot(value){
        return value**0.5;
    }
},
];

function roundDisplayResult(result){
    if(result != ''){
       roundResult = Math.round((result + Number.EPSILON) * 100) / 100;
       return roundResult; 
    }
}



function defineBasicOperationLogic(operation, operationsArrayId, button) {
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


function defineDecimalNumber(){
    if (firstValue == ''){
        firstValue = '0.';
        displayNumber.textContent = `${firstValue}`;
    } else if (firstValue != '' && !firstValue.includes('.')){
        firstValue += '.';
        displayNumber.textContent = `${firstValue}`;
    }
}



function operator(id) {
    switch (id) {
        case 'sum':
            firstValue = +firstValue;
            result = operations[0].sum(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`
            operations[0].isPressed = false;
            break;
        case 'subtraction':
            firstValue = +firstValue;
            result = operations[1].subtraction(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`
            operations[1].isPressed = false;
            break;
        case 'multiplication':
            firstValue = +firstValue;
            result = operations[2].multiplication(result, firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`
            operations[2].isPressed = false;
            break;
        case 'division':
            firstValue = +firstValue;
            result = operations[3].division(result, firstValue);
            firstValue = '';
            // if (result == "ERROR, CAN'T DIVIDE BY ZERO."){
            //     displayNumber.textContent = `${result}`
            //     result = 0;
            // } else {}
                displayNumber.textContent = `${roundDisplayResult(result)}`
                operations[3].isPressed = false;
            
            break;
        case 'changeSign':
            firstValue = +firstValue;
            result = operations[5].changeSign(firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`;
            operations[5].isPressed = false;
            break;
        case 'pow':
            firstValue = +firstValue;
            result = operations[6].pow(firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`;
            operations[6].isPressed = false;
            break;
        case 'squareRoot':
            firstValue = +firstValue;
            result = operations[7].squareRoot(firstValue);
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`;
            operations[7].isPressed = false;
            break;
    }
};


