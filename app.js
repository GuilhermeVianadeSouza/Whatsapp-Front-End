'use strict'

const cabecario = document.getElementById('cabecario')
const entradaInformacoes = document.querySelector('.entrada-informacoes')
const escopo = document.getElementById('escopo')

    function mostrarFormulario(entradaInformacoes){
    const whatsappFormulario = document.createElement('div')
    whatsappFormulario.classList.add('formulario')

    const whatsappInput = document.createElement('input')
    whatsappInput.type = 'tel'
    whatsappInput.placeholder = 'Digite seu número'
    whatsappInput.maxLength = '11'
    whatsappInput.pattern = '\d{11}'

    whatsappInput.classList.add('informe-numero')

    const botaoAcessar = document.createElement('button')
    botaoAcessar.classList.add('acessar-whatsapp')

    
    whatsappFormulario.appendChild(whatsappInput)
    whatsappFormulario.appendChild(botaoAcessar)

    entradaInformacoes.appendChild(whatsappFormulario)

    return entradaInformacoes
                        } 


async function confirmandoWhatsapp(numero){
    try {
        const response = await fetch(`http://localhost:8080/v1/whatsapp/informationforcontact/:${numero}.json`)
    } catch (error) {
        
    }
}

mostrarFormulario(entradaInformacoes)