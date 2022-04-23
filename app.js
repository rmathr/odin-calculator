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
            if (button.id == 'sum'){
                console.log(`${button.id}`);  
                if(result != '' && firstValue != ''){
                    firstValue = +firstValue;
                    //operator('sum', firstSavedValue, firstValue);
                    result = operations.sum(result, firstValue);
                    firstValue = '';
                    displayNumber.textContent = `${result}`
                    sumPressed = false;     
                } else {
                    result = +firstValue;
                    firstValue = '';
                    sumPressed = true; 
                }
            } else if (button.id == 'equal'){
                    if(sumPressed === true){
                    firstValue = +firstValue;
                    result = operations.sum(result, firstValue);
                    firstValue = '';
                    displayNumber.textContent = `${result}`
                    sumPressed = false;   
                    }
            } else if (button.value == 'x') {
                operator('x');
            } else if (button.value == '/') {
                operator('/');
            } else {
                operator('=');
            }
        })
    })
}




const operations = {
    sum (firstValue, secondValue){
        return firstValue+secondValue;
    },
    subtraction (){},
    multiplication (){},
    division (){},
    evaluation (){},
}

// function operator (buttonId, firstValue, secondValue){
//     if(buttonId == 'sum'){
//         sumResult = operations.sum(firstValue, secondValue);
//         console.log(sumResult);
//         return sumResult;
//     }
    
// }