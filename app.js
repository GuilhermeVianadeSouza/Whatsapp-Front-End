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
        const valorDigitado = whatsappInput.value //pegando o valor do imput

        confirmandoWhatsapp(valorDigitado) //chamando a função que vai fazer o fetch e validar
    })


    //acoplando os elementos para um pai/mãe
    whatsappFormulario.appendChild(whatsappLabel)
    whatsappFormulario.appendChild(whatsappInput)
    whatsappFormulario.appendChild(botaoAcessar)
    entradaInformacoes.appendChild(whatsappFormulario)

    return entradaInformacoes //retornando o formulario para ser visualizado pelo usuário
    } 


    //função feita para confirmar qual usuário está querendo suas informações
async function confirmandoWhatsapp(numero){
    try {
        const url = (`https://whatsapp-back-end.onrender.com/v1/whatsapp/informationforcontact/${numero}`) //caminho para realização do fetch, declaração do ${numero} que é o valorDigitado do evento do botão que fizemos na função anterior
        const resposta = await fetch(url) //Realização do fetch (pegando as informações da API)

        if(!resposta.ok){
            throw new error(`Erro da API: ${resposta.status} ${resposta.statusText}`); //Aqui nesse quesito é definido caso der um erro.
        }

        const informacoes = await resposta.json() //criado uma constante apenas para segurar a resposta.json (segurança para próximas utilizações)
        document.body.replaceChildren() //limpando o body para visualização da nova tela.
        contatosWhatsapp(informacoes) //chamando a função que vai trazer a nova tela.
    } catch (error) {
        return mostrarFormulario
    }
}

//função que mostra a nova tela, a tela dos contatos.
async function contatosWhatsapp(informacoes) {

    console.log(informacoes)

    //declarando novamente o cabecario, body e footer da tela
    document.body.appendChild(cabecario) 
    document.body.appendChild(entradaInformacoes)
    document.body.appendChild(escopo)

    entradaInformacoes.innerHTML = '' //limpando o body para agora sim ser colocadas novas divs a serem utilizadas na aplicação

    const caminhoImagens = './img/' //Definindo o caminho das imagens para um maior controle em caso de mudança

    const headerUsuario = document.createElement('div')
    headerUsuario.classList.add('headerUsuario')
    
    //Criação dos OBJETOS, DIV E AFINS que receberam as informações do JSON pego anteriormente em sequencia
    const contatos = document.createElement('div')
    contatos.classList.add('contatos-whatsapp')

    //Criação de repetição para criação da lista de contatos ao lado.
    informacoes.information.contacts.forEach(func =>{ //O que ocorre nesse for each: 
    // Adentramos a const que guardar o JSON (informacoes), depois entramos em information(objeto) e assim entramos em contacts(array) e percorremos eles criando os elementos

    const quadradoContato = document.createElement('div')
    quadradoContato.classList.add('caixaContato')

    const imagemContato = document.createElement('img')
    imagemContato.src = caminhoImagens + informacoes.image
    imagemContato.classList.add('foto-usuario')

    const nomeContato = document.createElement('p')
    nomeContato.classList.add('nome-usuario')
    nomeContato.textContent = informacoes.name
    

    quadradoContato.appendChild(imagemContato)
    quadradoContato.appendChild(nomeContato)
    contatos.appendChild(quadradoContato)

    entradaInformacoes.appendChild(contatos)
    cabecario.appendChild(headerUsuario)
    })
}

async function ultimaConversa(numeroUsuario, numeroContato) {
    try {
        const url = (`https://whatsapp-back-end.onrender.com/v1/whatsapp/informationcontactuser/${numeroUsuario}${numeroContato}`)
    } catch (error) {
        
    }
}

mostrarFormulario(entradaInformacoes)
confirmandoWhatsapp()