const displayNumber = document.getElementById('displayNumber');
const displaySign = document.getElementById('displaySign');
const displayResult = document.getElementById('displayResult');
const displayOpSymbol = document.getElementById('displayOpSymbol');
const displayNumber2 = document.getElementById('displayNumber2');

const numericButtons = document.querySelectorAll('.numeric-buttons button');
const operationsButtons = document.querySelectorAll('.operations-buttons button');
let firstValue = '';
let result = '';
let firstSavedValue = '';
let sumResult;
let opPressed = '';
let roundResult = '';
let pressingVerif = false;


handleNumericButtons(numericButtons);
handleOperatorButtons(operationsButtons);




function handleNumericButtons(id) {
    id.forEach(button => {
        button.addEventListener('click', 
        () => {
            verifyOperationCondition(button); 
        });
    });
}
// function handleNumericButtons(id) {
//     id.forEach(button => {
//         button.addEventListener('click',
//             () => {
//                 //         firstValue += button.value;          
//                 //         // displayNumber.textContent = `${firstValue}`
//                 //         defineDisplayLogic(firstValue,result);
//                 //         console.log(firstValue);

//                 //     //console.log(button.value);
//                 operations.some(pressed => {
//                     return pressingVerif = pressed.isPressed;
//                 })
//                 if (result == '') {
//                     firstValue += button.value;
//                     defineDisplayLogic(firstValue, result);
//                 } else if (pressingVerif === true && result != '') {
//                     firstValue += button.value;
//                     defineDisplayLogic(firstValue, result);
//                 }
//             }
//         );
//     });
// }

function verifyOperationCondition(button){
    operations.some(pressed => {
        return pressingVerif = pressed.isPressed;
    })
    if(result ==''){
        firstValue += button.value;
        defineDisplayLogic(firstValue,result);
    } else if (pressingVerif === true && result !=''){
        firstValue += button.value;
        defineDisplayLogic(firstValue,result);
    }
}


function handleOperatorButtons (id){
    id.forEach( button => {
        button.addEventListener('click',
        () => {
            if(firstValue != '-'){
                switch (button.id){
                    case 'sum':
                        operations[4].evaluation()
                        defineDisplayLogic(firstValue, result)
                        defineBasicOperationLogic('sum', 0, button);
                    break;
                 case 'subtraction':
                        operations[4].evaluation()
                        defineDisplayLogic(firstValue, result)
                        defineBasicOperationLogic('subtraction', 1, button);
                    break;    
                 case 'multiplication':
                         if(firstValue != '' || result != ''){
                            operations[4].evaluation()
                            defineDisplayLogic(firstValue, result)
                            defineBasicOperationLogic('multiplication', 2, button);
                         }      
                    break;
                 case 'division':
                        if (firstValue != '' || result != ''){
                            operations[4].evaluation()
                            defineDisplayLogic(firstValue, result)
                            defineBasicOperationLogic('division', 3, button);
                        }
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
                            pressingVerif = false;
                    break;
                 case 'changeSign':
                        handleSign();
                    break;
                 case 'erase':
                 if(firstValue != ''){
                    firstValue = firstValue.slice(0,-1);
                    displayResult.textContent = `${firstValue}`;
                 }       
                    break;
                 case 'clear':
                        firstValue = '';
                        result = '';
                        displayNumber.textContent = '';
                        displayResult.textContent = '';
                }
            }
            if(button.id != 'changeSign' && button.id != 'dot'){
                operations.filter(pressed => {
                    if (pressed.isPressed === true) {
                        opPressed = `${pressed.value}`;
                        defineDisplayLogic(firstValue,result); 
                    } });
            }
           
        })
    })
};



function handleSign(){
    if (!firstValue.includes('-')){
        firstValue = '-' + firstValue;
        defineDisplayLogic(firstValue, result);       
    } else {
        firstValue = firstValue.slice(1);
        defineDisplayLogic(firstValue, result)
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

function defineDecimalNumber(){
    if (firstValue == ''){
        firstValue = '0.';
        displayResult.textContent = `${firstValue}`;
    } else if (firstValue != '' && !firstValue.includes('.')){
        firstValue += '.';
        displayResult.textContent = `${firstValue}`;
    }
}

function defineDisplayLogic(firstValue, result){
    if (result == ''){
            displayResult.textContent = `${firstValue}`
    }   
    else {
        displayResult.textContent = `${roundDisplayResult(result)} ${opPressed} ${firstValue}`
    }
    
}


const operations = [{
    id: 'sum',
    isPressed: null,
    value: '+',
    sum(firstValue, secondValue) {
        return firstValue + secondValue;
    }
}, {
    id: 'subtraction',
    isPressed: null,
    value: '-',
    subtraction(firstValue, secondValue) {
        return firstValue - secondValue;
    }
}, {
    id: 'multiplication',
    isPressed: null,
    value: 'x',
    multiplication(firstValue, secondValue) {
        return firstValue * secondValue;
    }
}, {
    id: 'division',
    isPressed: null,
    value: '/',
    division(firstValue, secondValue) {
        // if (secondValue == 0){
        //     return "ERROR, CAN'T DIVIDE BY ZERO."
        // } 
        return firstValue / secondValue == Infinity ? "ERROR" : firstValue / secondValue;
    }
}, {
    id: 'evaluation',
    isPressed: null,
    value: '=',
    evaluation() {
        if(firstValue != '' && firstValue != '-' && result == '' && pressingVerif === false){
            firstValue = +firstValue;
            result = firstValue;
            firstValue = '';
            displayNumber.textContent = `${roundDisplayResult(result)}`; 
        } else {
            operations.filter(pressed => {
                if (pressed.isPressed === true) {
                    return operator(`${pressed.id}`);
                }
            })
        }
    }
},
{
    id: 'changeSign',
    isPressed: null,
    value: '-',
    changeSign(value) {
        displaySign.textContent = '';
        return value * (-1);
    }
},
{
    id: 'pow',
    isPressed: null,
    value: null,
    pow(value){
        return value**2;
    }
},
{
    id: 'squareRoot',
    isPressed: null,
    value: null,
    squareRoot(value){
        return value**0.5;
    }
},
];



function roundDisplayResult(result){
    if(result != '' && result !== 0){
       roundResult = Math.round((result + Number.EPSILON) * 100) / 100;
       if(roundResult/1e14 > 1){
           roundResult = roundResult.toExponential(2);
       }
       return roundResult; 
    } else {
        roundResult = 0;
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







function operator(id) {
    switch (id) {
        case 'sum':
            if (firstValue == ''){
                result = result;
                firstValue = '';
            } else {
                firstValue = +firstValue;
                result = operations[0].sum(result, firstValue);
                firstValue = '';
            }
            displayNumber.textContent = `${roundDisplayResult(result)}`
            // displayResult.textContent = `${roundDisplayResult(result)}`
            // displayOpSymbol.textContent = '';
            operations[0].isPressed = false;
            break;
        case 'subtraction':
            if (firstValue == ''){
                result = result;
                firstValue = '';
            } else {
                firstValue = +firstValue;
                result = operations[1].subtraction(result, firstValue);
                firstValue = '';
            }
            displayNumber.textContent = `${roundDisplayResult(result)}`
            operations[1].isPressed = false;
            break;
        case 'multiplication':
            if (firstValue == ''){
                result = result;
                firstValue = '';
            } else {
                firstValue = +firstValue;
                result = operations[2].multiplication(result, firstValue);
                firstValue = '';
            } 
            displayNumber.textContent = `${roundDisplayResult(result)}`
            operations[2].isPressed = false;
            break;
        case 'division':
            if (firstValue == ''){
                result = result;
                firstValue = '';
            } else {
                firstValue = +firstValue;
                result = operations[3].division(result, firstValue);
                firstValue = '';
            }    
            // if (result == "ERROR, CAN'T DIVIDE BY ZERO."){
            //     displayNumber.textContent = `${result}`
            //     result = 0;
            // } else {}
                if(result != "ERROR"){
                    displayNumber.textContent = `${roundDisplayResult(result)}`
                }  else {
                    displayNumber.textContent = `${result}`;
                    firstValue = '';
                    result = '';
                }
                operations[3].isPressed = false;
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


