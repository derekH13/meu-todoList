const containerColumns = document.querySelector(".columns")
const colunaCards = document.querySelectorAll('.column-cards');
const btnAdd = document.querySelector('.btn-add');
const btnEditarColuna = document.querySelector('.btn-editar');
const btnExcluirColuna = document.querySelector('.btn-excluir')
const coluna = document.querySelectorAll('.column')
const card = document.querySelectorAll('.card1')
const btnFecharColuna = document.querySelectorAll('.fechar-column');
let cardCheck, draggedCard;



// ================== FUNÇÕES ==========================

//assim que começar a arrastar
const dragStart = ({target}) => {
    draggedCard = target
    console.log(draggedCard)
}

//create elementos
const createEl = (tag, classe) => {
    const elementoCreate = document.createElement(tag)
    const clas = classe.split()

for(const x of clas){
    elementoCreate.className = x;
}

    return elementoCreate;

}

//adicionar coluna
const addColumn = () => {
    const colunaTodo = createEl('div', 'column')
    const colunaCard = createEl('section', "column-cards");
    const topColumn = createEl('div', 'top-column')
    const colunaTitulo = createEl('h2', "column-title" )
    const btnFecharColumn = createEl('button', 'fechar-column');
    btnFecharColumn.innerHTML =  " <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-x' viewBox='3 3 10 10'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708'></svg>"
    
    colunaTitulo.innerHTML = "";
    colunaTitulo.contentEditable = 'true';

    btnFecharColumn.addEventListener('click', (e) => { btnExcluir(e) })
    colunaTodo.addEventListener('dragover', dragOver)//dispara quando um elemento um elemento é arrastado por cima do column
    colunaTodo.addEventListener('dragenter', dragEnter)//dispara quando entrar na area do elemento
    colunaTodo.addEventListener('dragleave', dragLeave)
    colunaTodo.addEventListener('drop', drop)//assim que um elemento é drop em cima
    colunaTodo.addEventListener('dblclick', (e) => {
        adicionarCard(e);
    })


    topColumn.append(colunaTitulo)
    topColumn.append(btnFecharColumn)

  

    colunaTodo.append(topColumn);
    colunaTodo.append(colunaCard);

    containerColumns.append(colunaTodo)
    colunaTitulo.focus()

    colunaTitulo.addEventListener('focusout', (e) => {
        if(colunaTitulo.innerText == ''){
            const y = e.target.parentElement;
            const x = y.parentElement;
            x.remove()
        }
        })
    
}

//adicionar card dois click
const adicionarCard = (e) => {

if(e.target.classList.contains('column')){

    const card = createEl('div', 'card1');
    const conteudo = createEl('h2', 'conteudo-card')
    conteudo.innerHTML = '';
    conteudo.contentEditable = 'true'
    const containerButton = createEl('div', 'button-todo comprimir hidden');
    const btnGreen = createEl('button','btn-todo gren');
    const btnYellow = createEl('button','btn-todo yellow');
    const btnRed = createEl('button','btn-todo red');
    btnGreen.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnYellow.innerHTML = '<i class="fa-solid fa-pen"></i>';
    btnRed.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    card.addEventListener('dblclick', mostrarCard)
    

    containerButton.append(btnGreen)
    containerButton.append(btnYellow)
    containerButton.append(btnRed)

    card.append(conteudo)
    card.append(containerButton)

    const colunaCard = e.target.querySelector('.column-cards')
    card.setAttribute('draggable', 'true')

    card.addEventListener('dragstart', dragStart)//assim que arrastar o elemento

    colunaCard.append(card)
    conteudo.focus()

    conteudo.addEventListener('focusout', () => {
        if(conteudo.innerText == ""){
            card.remove()
        }
    })

}


}

//mostrar opções do Card
const mostrarCard = (e) => {
   
    const cardSelect = e.target;
    const op = cardSelect.querySelector('.button-todo')

    op.classList.toggle('hidden')

}

//btn Excluir Coluna
const btnExcluir = ({target}) => {
    const col = target.parentElement;
    col.parentElement.remove()

}

//add check
const addCheck = (e) => {
    const pai = e.parentElement;
    const x = pai.parentElement;
    x.classList.toggle('concluido')

    return cardCheck++
}

//excluir Card
const excluirCard = (e) => {
    const pai = e.parentElement;
    const x = pai.parentElement;
    x.remove()
}

//editar card
const editarCard = (e) => {

    const pai = e.parentElement;
    const x = pai.parentElement;
    const texto = x.querySelector('.conteudo-card');

    texto.style.pointerEvents = 'all';
    texto.contentEditable = 'true';
    texto.focus()

    texto.addEventListener('focusout', () => {
        texto.style.pointerEvents = 'none';

        if(texto.innerText == ''){
            x.remove()
        }
    })
}

//dispara quando um elemento é arrastado por cima column
const dragOver = (event) => {
    event.preventDefault();
    
}

//ao entrar na area no elemento
const dragEnter = ({target}) => {

    if(target.classList.contains('column')){
        target.classList.add('border-select')
    }
}

//ao sair da area no elemento
const dragLeave = (e) => {
    if(e.target.classList.contains('column')){
        e.target.classList.remove('border-select')
    }

    
}


const drop = (e) => {

    if(e.target.classList.contains('border-select')){
        e.target.classList.remove('border-select')
        e.target.append(draggedCard);
    }


 
}











//============================= EVENT ============================

document.addEventListener('click', (e) => {

const elemento = e.target;
console.log(elemento)

//adicionar uma coluna
if(elemento.classList.contains('btn-add')){
    addColumn()  
}

if(elemento.classList.contains('gren')){
    addCheck(elemento)
}

if(elemento.classList.contains('red')){
    excluirCard(elemento);
}

if(elemento.classList.contains('yellow')){
    editarCard(elemento);
}




})








//adicinar um card
for(const c of coluna){
    c.addEventListener('dblclick', (e) => {
        adicionarCard(e);
    })

    c.addEventListener('dragover', dragOver)//dispara quando um elemento um elemento é arrastado por cima do column
    c.addEventListener('dragenter', dragEnter)//dispara quando entrar na area do elemento
    c.addEventListener('dragleave', dragLeave)//dispara quando sair da area do elemento
    c.addEventListener('drop', drop)


}

//mostrar os botoes dos cards
for(const x of card){
    x.addEventListener('dblclick', (e) => {
        mostrarCard(e)
    })

    x.addEventListener('dragstart', dragStart)
}

for(const x of btnFecharColuna){
    x.addEventListener('click', (e) => {
        btnExcluir(e)
    })
}





