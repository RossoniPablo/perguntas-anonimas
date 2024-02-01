import Modal from './modal.js';

const modal = Modal()

//Selecionando para trocar a escrita
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button') //Botão 'Sim, excluir'

// Selecionando o form e mudando seu action
const form = document.querySelector('.modal form')

// ----Quando o botão marcar como lido for clicado abre a modal
//pegar todos os botões que existe com a clsse check
const checkButtons = document.querySelectorAll(".check")
//Adicionar event em todos os botões com a classe .check, com for each  para percorrer todos
checkButtons.forEach(button => {
    //adicionar a escuta
    button.addEventListener("click", handleClick)
})

//----Quando o botão excluir for clicado ele abre a modal
//pegar todos os botões que existe com a clsse delete
const deleteButton = document.querySelectorAll(".delete")
//Adicionar event em todos os botões com a classe .delete, com for each  para percorrer todos
deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

// Função que consta todos os parametros 
function handleClick(event, check = true){
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML= `${text} esta pergunta`
    modalDescription.innerHTML= `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML= `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    
    //abrir modal
    modal.open()
}



