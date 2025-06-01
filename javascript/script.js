console.log('bootstrap-preventivo')

// prendo gli elementi dal DOM
const elementForm = document.getElementById('form-input')  //object
const inputPromo = document.getElementById('input-promo')  //object

console.log(elementForm, inputPromo);


// prendo gli elementi dal form
const inputTypeJob = elementForm.querySelector('#input-type-job')  //object
const outputFinalPriceFirstNumber = elementForm.querySelector('#final-price-first-number')  //object
const outputFinalPriceSecondNumber = elementForm.querySelector('#final-price-second-number')  //object

console.log(inputTypeJob, outputFinalPriceFirstNumber, outputFinalPriceSecondNumber);


// funzione per gli elementi di input
function getDataInput() {
    const typeJob = inputTypeJob.value  //string
    const promo = inputPromo.value  //string
    return {
        typeJob,
        promo
    }    //object
}


// constanti delle ore / prezzo all'ora / array promo
const hours = 10  //number
const priceBackendSingleHour = 20.50  //number
const priceFrontendSingleHour = 15.30  //number
const priceAnalistSingleHour = 33.60  //number
const arrayPromo = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']  //array(string)

console.log(hours, priceAnalistSingleHour, priceBackendSingleHour, priceFrontendSingleHour);


// funzione per calcolare il preventivo
function getBudget(price, hour) {
    finalPrice = price * hour
    return finalPrice  //number
}

// funzione per calcolare prezzo scontato
function getDiscountPrice(price, discount) {
    discountPrice = (price / 100) * discount
    finalPrice = price - discountPrice
    return finalPrice
    // return number
  }


// funzione per cercare nel array
function isValidPromo(array, includedWord) {
    /*
    let isIncluded = false
    for (let i = 0; i < array.length; i++) {
        const stringPromo = array[i];
        console.log(stringPromo);
        if (stringPromo === includedWord) {
            isIncluded = true
        } 
    }
    return isIncluded //boolean
    */
    return array.includes(includedWord)
}

    
    
    
// event listener per verificare se il codice promo è corretto no
inputPromo.addEventListener('input', function (event) {
    event.preventDefault()

    const inputData = getDataInput()

    if (isValidPromo(arrayPromo, inputData.promo)) {
        inputPromo.classList.remove('is-invalid')
        inputPromo.classList.add('is-valid')
    } else {
        inputPromo.classList.remove('is-valid')
        inputPromo.classList.add('is-invalid')
    }
    console.dir(inputPromo);
})





// aggiungo event listener
elementForm.addEventListener('submit', function (event) {
    
    // elimino comportamento default submit
    event.preventDefault()
   
    // metto tutti gli input in un object
    const inputData = getDataInput()  //object
    console.log(inputData);

    //verifico quale option stata selezionata e calcolo prezzo finale
    if (inputData.typeJob === 'backend-dev') {
        finalPrice = getBudget(priceBackendSingleHour, hours)
    } else if (inputData.typeJob === 'frontend-dev') {
        finalPrice = getBudget(priceFrontendSingleHour, hours)
    } else {
        finalPrice = getBudget(priceAnalistSingleHour, hours)
    }
    
    if (isValidPromo(arrayPromo, inputData.promo)) {
        finalPrice = getDiscountPrice(finalPrice, 25)
    }
    
    console.log(finalPrice);
    

    // divido in due parti il prezzo finale e lo stampo sulla pagina
    const finalPriceString = finalPrice.toFixed(2).toString()  //string
    console.log(finalPriceString);

    const pointIndex = finalPriceString.indexOf('.')
    console.log(pointIndex);
    
    const firstNumberFinalPrice = finalPriceString.substring(0, pointIndex)
    console.log(firstNumberFinalPrice);
    const secondNumberFinalPrice = finalPriceString.substring(pointIndex)
    console.log(secondNumberFinalPrice)

    outputFinalPriceFirstNumber.classList.add('fw-bold', 'fs-1')
    outputFinalPriceFirstNumber.textContent = `\u20AC ${firstNumberFinalPrice}`
    outputFinalPriceSecondNumber.classList.add('fw-light', 'fs-4')
    outputFinalPriceSecondNumber.textContent = secondNumberFinalPrice
     
    /*
    let firstNumberFinalPrice = ''  //string
    let secondNumberFinalPrice = ''  //string
    const pointIndex = finalPriceString.indexOf('.')
    for (let i = 0; i < finalPriceString.length; i++) {
        const char = finalPriceString[i];
        console.log(char);
        if (i < pointIndex) {
            firstNumberFinalPrice += char
        } else if (i > pointIndex) {
            secondNumberFinalPrice += char
        }
    }
    console.log(firstNumberFinalPrice)
    console.log(secondNumberFinalPrice);
    outputFinalPriceFirstNumber.classList.add('fw-bold', 'fs-1')
    outputFinalPriceFirstNumber.textContent = `\u20AC ${firstNumberFinalPrice}`
    outputFinalPriceSecondNumber.classList.add('fw-light', 'fs-4')
    outputFinalPriceSecondNumber.textContent = `,${secondNumberFinalPrice}`
    */
})


// creo dinamicamente option
selectOption = [
    {
        text: 'seleziona il tipo di lavoro',
        value: ''
    },
    {
        text: 'Backed Development',
        value: 'backend-dev'
    },
    {
        text: 'Frontend Development',
        value: 'frontend-dev'
    },
    {
        text: 'Project Analysis',
        value: 'project-analysis'
    },
]


console.log(inputTypeJob);


/*
// creo gli option
const optionEmpty = document.createElement('option')
const optionBackendDev = document.createElement('option')
const optionFrontDev = document.createElement('option')
const optionProjectAnalisis = document.createElement('option')

// assegno il text e value agli option creati
optionEmpty.textContent = selectOption[0].text
optionEmpty.value = selectOption[0].value
document.getElementById('input-type-job').appendChild(optionEmpty)

optionBackendDev.textContent = selectOption[1].text
optionBackendDev.value = selectOption[1].value
document.getElementById('input-type-job').appendChild(optionBackendDev)

optionFrontDev.textContent = selectOption[2].text
optionFrontDev.value = selectOption[2].value
document.getElementById('input-type-job').appendChild(optionFrontDev)

optionProjectAnalisis.textContent = selectOption[3].text
optionProjectAnalisis.value = selectOption[3].value
document.getElementById('input-type-job').appendChild(optionProjectAnalisis)
*/

// ciclo ogni elemento array e creo per ognuno option con i text e value corrispondente
selectOption.forEach(element => {
    const option = document.createElement('option')

    option.textContent = element.text
    option.value = element.value
    document.getElementById('input-type-job').appendChild(option)
});
