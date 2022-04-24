const displayNumber = document.getElementById('displayNumber');


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
             case 'equal': 
                    
                    operations[4].evaluation();
             //  if(operations[0].isPressed === true){
            //     operator('sum');  
            //     } else if (operations[1].isPressed === true){
            //         operator('subtraction');  
            //     }
                break;
            }
        })
    })
};





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
        // if (operations[0].isPressed === true) {
        //     return operator('sum');
        // } else if (operations[1].isPressed === true) {
        //     return operator('subtraction');
        // } else if (operations[2].isPressed === true) {
        //     return operator('multiplication');
        // } else if (operations[3].isPressed === true) {
        //     return operator('division');
        // } else {
        //     console.log('Nothing happened.');
        // }
        operations.filter( pressed => {
            if(pressed.isPressed === true){
                //console.log(`button pressed: ${pressed.id}`);
                return operator(`${pressed.id}`);
            }
        })
    
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
    operations.filter( pressed => {
        if(pressed.isPressed === true){
            console.log(`button pressed: ${pressed.id}`);
        }
    })
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
    }
};


    
// function handleOperatorButtons (id){
//     id.forEach( button => {
//         button.addEventListener('click',
//         () => {
//             if (button.id == 'sum'){
//                 console.log(`${button.id}`);  
//                 if(result != '' && firstValue != ''){
//                     operator('sum');     
//                 } else if(result != '' && firstValue == ''){
//                     result = result;
//                     firstValue = '';
//                     operations[0].isPressed = false;
//                 } else {
//                     result = +firstValue;
//                     firstValue = '';
//                     operations[0].isPressed = true; 
//                 }
//             } else if (button.id == 'equal'){
//                     if(operations[0].isPressed === true){
//                     operator('sum');  
//                     }
//             } else if (button.value == 'x') {
//                 operator('x');
//             } else if (button.value == '/') {
//                 operator('/');
//             } else {
//                 operator('=');
//             }
//         })
//     })
// };
