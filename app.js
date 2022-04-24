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
                    operator('sum');     
                } else if(result != '' && firstValue == ''){
                    result = result;
                    firstValue = '';
                    operations[0].isPressed = false;
                } else {
                    result = +firstValue;
                    firstValue = '';
                    operations[0].isPressed = true; 
                }
            } else if (button.id == 'equal'){
                    if(operations[0].isPressed === true){
                    operator('sum');  
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
        return firstValue*secondValue;
    }
}, {
    id: 'division',
    isPressed: null,
    division(firstValue, secondValue) {
        return firstValue/secondValue;
    }
}, {
    id: 'evaluation',
    isPressed: null,
    evaluation() {
    }
},
];
// const operations = {
//     sum (firstValue, secondValue){
//         return firstValue+secondValue;
//     },
//     subtraction (){},
//     multiplication (){},
//     division (){},
//     evaluation (){

//     },
// }

function operator (id){
if(id == 'sum'){
    firstValue = +firstValue;
    result = operations[0].sum(result, firstValue);
    firstValue = '';
    displayNumber.textContent = `${result}`
    operations[0].isPressed = false;
} 
};
    
