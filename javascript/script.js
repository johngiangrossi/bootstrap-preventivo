console.log('bootstrap-preventivo')

// prendo gli elementi dal DOM
const elementForm = document.getElementById('form-input')
console.log(elementForm);


// prendo gli elementi dal form
const inputTypeJob = elementForm.querySelector('#input-type-job')
const inputPromo = elementForm.querySelector('#input-promo')
const outputFinalPrice = elementForm.querySelector('#final-price')

console.log(inputPromo, inputTypeJob, outputFinalPrice);

// funzione per gli elementi di input
function getDataInput() {
    const typeJob = inputTypeJob.value
    const promo = inputPromo.value
    return {
        typeJob,
        promo
    }
}

// constanti delle ore/ prezzo all'ora
const hours = 10  //number
const priceBackendSingleHour = 20.50  //number
const priceFrontendSingleHour = 15.30  //number
const priceAnalistSingleHour = 33.60  //number

console.log(hours, priceAnalistSingleHour, priceBackendSingleHour, priceFrontendSingleHour);

// funzione per calcolare il preventivo
function getBudget(price, hour) {
    finalPrice = price * hour
    return finalPrice  //number
}

// aggiungo event listener
elementForm.addEventListener('submit', function (event) {
    
    // elimino comportamento default submit
    event.preventDefault()

    const inputData = getDataInput()

    if (inputData.typeJob === 'backend-dev') {
        finalPrice = getBudget(priceBackendSingleHour, hours)
    } else if (inputData.typeJob === 'frontend-dev') {
        finalPrice = getBudget(priceFrontendSingleHour, hours)
    } else {
        finalPrice = getBudget(priceAnalistSingleHour, hours)
    }
    
    outputFinalPrice.textContent = finalPrice
    console.log(finalPrice);
})