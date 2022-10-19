import "./css/index.css"
import IMask from "imask"

/*  
PASSO A PASSO

passo 1 - obter os elementos do html para mudar as cores ok 
passo - 2 montar uma estrutura de dados de cores para cada cartao e default ok 
passo - 3 - montar a cor dinamicamenmto com a chamada da funcao atrbes do nome do cartao ok 
passo 4 - testar funcao global  ok 

passo 5 - pegar o logo e cores do figma

chave 1 : #javascript
*/
const mainColorCard = document.querySelector(".cc")
const ccColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

const setCardColors = (type) => {
  const colors = {
    visa: ['#161663', '#040435'],
    mastercard: ['#370c53', '#370c53'],
    alelo: ['#000', '#307230'],
    default: ['#000', 'gray']
  }

  mainColorCard.style.backgroundImage = `url('cc-bg-${type}.svg')`
  ccColor01.setAttribute('fill', colors[type][0])
  ccColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)

}

setCardColors('visa')
globalThis.setCardColors = setCardColors

/*
PASSO A PASSO

passo 1 - referenciar os html com query
passo 2 - fazer a empressão regular do cvd
poasso 3 - fazer a expressão regular do cencimento
*/


// Uso da lib imask js

const securityCode = document.querySelector('#security-code')

const securityCodePattern = {
  mask: '0000'
};
const resultMaskSecurity = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector('#expiration-date')

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
};
const mask = IMask(expirationDate, expirationDatePattern);

