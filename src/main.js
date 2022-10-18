import "./css/index.css"

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
    visa: ['orange', 'green'],
    mastercard: ['red', 'green'],
    alelo: ['#0E0E0E', '#21FF0E'],
    default: ['#000', 'gray']
  }

  mainColorCard.style.backgroundImage = `url('cc-bg-${type}.svg')`
  ccColor01.setAttribute('fill', colors[type][0])
  ccColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)

}

setCardColors('mastercard')
globalThis.setCardColors = setCardColors



