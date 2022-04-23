const displayNumber = document.getElementById('displayNumber');


const numericButtons = document.querySelectorAll('.numeric-buttons button');
const operationsButtons = document.querySelectorAll('.operations-buttons button');

handleButtons(numericButtons);
handleButtons(operationsButtons);

function handleButtons (id){
    id.forEach( button => {
        button.addEventListener('click', 
        () => {
            console.log(button.value);
            displayNumber.textContent = `${button.value}`
        }
        );
    });
}

const operations = {
    sum (){},
    subtraction (){},
    multiplication (){},
    division (){},
}
