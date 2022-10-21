import "./css/index.css"
import IMask from "imask"
// import { createFilter } from "vite"

// ================== USANDO BIBLIOTECA IMASK JS ================ //

const mainColorCard = document.querySelector(".cc")
const ccColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')
//Forms
const form = document.querySelector('form')
const cardNumber = document.querySelector('#card-number')
const cardHolder = document.querySelector('#card-holder')
const expirationDate = document.querySelector('#expiration-date')
const securityCode = document.querySelector('#security-code')

//                                   Simples uso do imask apenas para criar mascaras   
const securityCodePattern = {
  mask: '0000'
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//                                      Uso do date mask / para datas
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

//                                 Uso do Dynamic Mask, escolher varios regex para um mesmo item
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardType: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'mastercard',

    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^7\d{0,15}/,
      cardType: 'alelo',

    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^6\d{0,15}/,
      cardType: 'elo',

    },
    {
      mask: '0000 0000 0000 0000',
      cardType: 'default'
    }
  ],

  //DISPARANDO EVENTO DO MÉTODO
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, ''); //deixando o campo nulo caso digite não digito
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) => number.match(regex));  // retornar o item ou undefined

    return foundMask
  },
}
const cardNumbermasked = IMask(cardNumber, cardNumberPattern);


const setCardColors = type => {
  const colors = {
    visa: ['#161663', '#040435'],
    mastercard: ['#370c53', '#370c53'],
    alelo: ['none', 'none'],
    elo: ['#000', '#110211'],
    default: ['#000', 'gray']
  }

  mainColorCard.style.backgroundImage = `url('cc-bg-${type}.svg')`
  ccColor01.setAttribute('fill', colors[type][0])
  ccColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)

}

const showTypedNameInRealTime = (input, elementClassName, defaultContent) => {
  const elementInDOM = document.querySelector(elementClassName)
  const inputValue = input.value
  const inputIsNull = inputValue.length === 0
  elementInDOM.textContent = inputIsNull ? `${defaultContent}` : inputValue
}

const returnFeedbackMessage = event => {
  event.preventDefault()
  const inputsArray = [cardHolder, cardNumber, securityCode, expirationDate]
  const isnull = inputsArray.find(input => input.value == "")
  const inputsNull = inputsArray
    .filter(input => input.value == "")
    .forEach(input => input.classList.toggle('invalid'))

  if (isnull) {
    alert('Preencha todos os campos!')
    cardNumber.focus()
  } else {
    confirm('Deseja adicionar o cartão?') ? alert('Cartão adicionado') : alert('Dispensado')
  }
}


cardNumbermasked.on('accept', () => {
  const inputsArray = [cardHolder, cardNumber, securityCode, expirationDate]
  inputsArray.forEach(input => input.classList.remove('invalid'))

  const cardType = cardNumbermasked.masked.currentMask.cardType
  setCardColors(cardType)
  showTypedNameInRealTime(cardNumber, '.cc-number', '1234 5678 9012 3456')
})

cardHolder.addEventListener('input', () => {
   if(cardHolder.value.length > 25){
     cardHolder.value === ""
    }
  showTypedNameInRealTime(cardHolder, '.cc-holder .value', 'FULANO DA SILVA'))
}

expirationDateMasked.on('accept', () =>
  showTypedNameInRealTime(expirationDate, '.cc-expiration .value', '02/33'))

securityCodeMasked.on('accept', () =>
  showTypedNameInRealTime(securityCode, '.cc-security .value', '123'))

form.addEventListener('submit', returnFeedbackMessage)
// globalThis.setCardColors = setCardColors
