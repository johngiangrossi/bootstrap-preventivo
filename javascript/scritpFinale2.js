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
        value: 'backend-dev',
        price: 20.50
    },
    {
        text: 'Frontend Development',
        value: 'frontend-dev',
        price: 15.30
    },
    {
        text: 'Project Analysis',
        value: 'project-analysis',
        price: 33.60
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



// funzione per il prezzo formattato
function getFormattedPrice(price) {
    const formattedPrice = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" , maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(
        price,
    )  //string
    const pointIndex = formattedPrice.lastIndexOf('.')  //number
    const commaIndex = formattedPrice.lastIndexOf(',')  //number
    console.log(pointIndex , commaIndex);
    
    let firstNumbersPrice
    let secondNumbersPrice

    if (pointIndex > commaIndex) {
        firstNumbersPrice = formattedPrice.substring(0, pointIndex)
        secondNumbersPrice = formattedPrice.substring(pointIndex)
    } else {
        firstNumbersPrice = formattedPrice.substring(0, commaIndex)
        secondNumbersPrice = formattedPrice.substring(commaIndex)
    }
    // console.log(secondNumbersPrice, firstNumbersPrice)
    resultPrice = { firstNumber: firstNumbersPrice, secondNumber: secondNumbersPrice }
    return resultPrice
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

    // cerco nel array l'object che ha il valore selezionato e lo assegno ad una variabile
    const objectSelected = selectOption.find(object => object.value === inputData.typeJob);
    /*
    const objectSelected = selectOption.find(function isIncluded(object) {
        return object.value === inputData.typeJob;  //boolean
    })
    */
    // console.log(objectSelected);
    


    // calcolo il prezzo finale
    finalPrice = getBudget(objectSelected.price, hours)
    console.log(finalPrice);

    // mostro all'utente se il codice promo è valido o no
    if (isValidPromo(arrayPromo, inputData.promo)) {
        inputPromo.classList.remove('is-invalid')
        inputPromo.classList.add('is-valid')
        finalPrice = getDiscountPrice(finalPrice, 25)
    } else {
        inputPromo.classList.remove('is-valid')
        inputPromo.classList.add('is-invalid')
    }

    // formatto il prezzo
    resultPrice = getFormattedPrice(finalPrice)

    // mostro utente il risultato
    outputFinalPriceFirstNumber.classList.add('fw-bold', 'fs-1')
    outputFinalPriceFirstNumber.textContent = resultPrice.firstNumber
    outputFinalPriceSecondNumber.classList.add('fw-light', 'fs-4')
    outputFinalPriceSecondNumber.textContent = resultPrice.secondNumber
   
})

