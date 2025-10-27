'use strict'

// Declaro o cabecario, o corpo e o escopo da tela

const cabecario = document.getElementById('cabecario')
const entradaInformacoes = document.querySelector('.entrada-informacoes')
const escopo = document.getElementById('escopo')

// Aqui eu monto o formulario que será apresentado na tela.

    function mostrarFormulario(entradaInformacoes){
    const whatsappFormulario = document.createElement('div')
    whatsappFormulario.classList.add('formulario')

    const whatsappLabel = document.createElement('label');
    whatsappLabel.textContent = 'Número de WhatsApp:';
    whatsappLabel.htmlFor = 'whatsappInput';

    const whatsappInput = document.createElement('input')
    whatsappInput.type = 'tel' //defino o input como para telefone
    whatsappInput.placeholder = 'Digite seu número'
    whatsappInput.maxLength = '11' //coloco um limitador máximo
    whatsappInput.pattern = '\d{11}'
    whatsappInput.classList.add('informe-numero')

    const botaoAcessar = document.createElement('button')
    botaoAcessar.textContent = 'Acessar'
    botaoAcessar.classList.add('acessar-whatsapp')

    botaoAcessar.addEventListener('click', function() {
        const valorDigitado = whatsappInput.value

        confirmandoWhatsapp(valorDigitado)
    })

    whatsappFormulario.appendChild(whatsappLabel)
    whatsappFormulario.appendChild(whatsappInput)
    whatsappFormulario.appendChild(botaoAcessar)
    entradaInformacoes.appendChild(whatsappFormulario)

    return entradaInformacoes
    } 


async function confirmandoWhatsapp(numero){
    try {
        const url = (`https://whatsapp-back-end.onrender.com/v1/whatsapp/informationforcontact/${numero}`)
        const resposta = await fetch(url)

        if(!resposta.ok){
            throw new error(`Erro da API: ${resposta.status} ${resposta.statusText}`);
        }

        const informacoes = await resposta.json()
        document.body.innerHTML = ''
        contatosWhatsapp()
    } catch (error) {
        return mostrarFormulario
    }
}

async function contatosWhatsapp() {
    document.body.appendChild(cabecario)
    document.body.appendChild(entradaInformacoes)
    document.body.appendChild(escopo)

    entradaInformacoes.innerHTML = ''

    
}

async function limpandoTela (){}

mostrarFormulario(entradaInformacoes)
confirmandoWhatsapp()