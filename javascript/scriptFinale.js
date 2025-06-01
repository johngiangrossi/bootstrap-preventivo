console.log('bootstrap-preventivo-finale')

// prendo gli elementi dal DOM
const elementForm = document.getElementById('form-input')  //object
const inputPromo = document.getElementById('input-promo')  //object

// console.log(elementForm, inputPromo);

// prendo gli elementi dal form
const inputTypeJob = elementForm.querySelector('#input-type-job')  //object
const outputFinalPriceFirstNumber = elementForm.querySelector('#final-price-first-number')  //object
const outputFinalPriceSecondNumber = elementForm.querySelector('#final-price-second-number')  //object

// console.log(inputTypeJob, outputFinalPriceFirstNumber, outputFinalPriceSecondNumber);


// constanti delle ore / prezzo all'ora / array promo
const hours = 10  //number
const priceBackendSingleHour = 20.50  //number
const priceFrontendSingleHour = 15.30  //number
const priceAnalistSingleHour = 33.60  //number
const arrayPromo = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']  //array(string)

// console.log(hours, priceAnalistSingleHour, priceBackendSingleHour, priceFrontendSingleHour);



// creo dinamicamente gli option
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
// console.log(selectOption);

// ciclo ogni elemento array e creo per ognuno option con i text e value corrispondente
selectOption.forEach(getOption)



// funzioni
// funzione per gli elementi di input
function getDataInput() {
    const typeJob = inputTypeJob.value  //string
    const promo = inputPromo.value  //string
    return {
        typeJob : typeJob,
        promo : promo
    }    //object
}

// funzione per calcolare il preventivo
function getBudget(price, hour) {
    let finalPrice = price * hour
    return finalPrice  //number
}

// funzione per calcolare prezzo scontato
function getDiscountPrice(price, discount) {
    let discountPrice = (price / 100) * discount
    let finalPrice = price - discountPrice
    return finalPrice   // return number
  }

// funzione per cercare nel array
function isValidPromo(array, includedWord) {
    return array.includes(includedWord)  //boolean
}
    
// funzione per creare option
function getOption(element) {
    const option = document.createElement('option')
    option.textContent = element.text
    option.value = element.value
    return inputTypeJob.appendChild(option)
}



// event listener
// event listener per il form
elementForm.addEventListener('submit', function (event) {
    
    // elimino comportamento default submit
    event.preventDefault()
   
    // metto tutti gli input in un object
    const inputData = getDataInput()  //object
    let finalPrice  //number
    // console.log(inputData);


    // mostro all'utente se il codice promo è valido o no
    if (isValidPromo(arrayPromo, inputData.promo)) {
        inputPromo.classList.remove('is-invalid')
        inputPromo.classList.add('is-valid')
    } else {
        inputPromo.classList.remove('is-valid')
        inputPromo.classList.add('is-invalid')
    }
    // console.dir(inputPromo);


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
    
    // console.log(finalPrice);
    
    // formatto il prezzo finale
    const formattedFinalPrice = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
        finalPrice,
      )  //string
    // console.log(formattedFinalPrice);


    // divido in due parti il prezzo finale e lo stampo sulla pagina
    const pointIndex = formattedFinalPrice.indexOf(',')  //number
    // console.log(pointIndex);
    
    const firstNumberFinalPrice = formattedFinalPrice.substring(0, pointIndex)
    const secondNumberFinalPrice = formattedFinalPrice.substring(pointIndex)
    console.log(secondNumberFinalPrice, firstNumberFinalPrice)

    outputFinalPriceFirstNumber.classList.add('fw-bold', 'fs-1')
    outputFinalPriceFirstNumber.textContent = firstNumberFinalPrice
    outputFinalPriceSecondNumber.classList.add('fw-light', 'fs-4')
    outputFinalPriceSecondNumber.textContent = secondNumberFinalPrice
})
