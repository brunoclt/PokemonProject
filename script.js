let currentPageUrl = 'https://pokeapi.co/api/v2/pokemon/'


window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');    
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage); //Monitorar evento
    backButton.addEventListener('click', loadPreviousPage); //Monitorar evento
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content'); //Chama um elemento pelo ID
    mainContent.innerHTML = ''; //Limpar resultados anteriores. 

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            let indexPoke = character.url.replace(/\D/g, "").substring(1, 5);
            const card = document.createElement("div"); //Cria novo elemento 
            card.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexPoke}.png')`
            card.className = "cards" //Cria nova classe


            //imagem
            const  characterNameBG = document.createElement('div') //Cria novo elemento
            characterNameBG.className = "character-name-bg" //Cria nova classe


            //texto
            const characterName = document.createElement('span') //Cria novo elemento 
            characterName.className = "character-name" //Cria nova classe
            characterName.innerText = `${character.name}` //Modifica o conteúdo de texto

            characterNameBG.appendChild(characterName) //Cria um filho para o elemento pai. 
            card.appendChild(characterNameBG);

            const characterModalName = document.createElement('span') //Cria novo elemento 
            characterName.className = "character-name" //Cria nova classe
            characterName.innerText = `${character.name}` //Modifica o conteúdo de texto

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility ='visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterName = document.createElement('span') //Cria novo elemento 
                characterName.className = "character-name" //Cria nova classe
                characterName.innerText = `${character.name}` //Modifica o conteúdo de texto

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
               `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indexPoke}.png')`
                characterImage.className = 'character-image'

                console.log('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + indexPoke + '.png');

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(characterName)
                modalContent.appendChild(characterModalName)
                

                
            }
            
            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card);

        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible"  : "hidden";

        currentPageUrl = url;

    } catch (error) {
        alert('Erro ao carregar personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);
    } catch (error) {
        console.log(error)
        alert('erro ao carregar a próxima pagina. ');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;
    
    try {
         const response = await fetch(currentPageUrl);
        const responseJson = await response.json();
    
        await loadCharacters(responseJson.previous);
    } catch (error) {
        console.log(error)
        alert('erro ao carregar a pagina anterior.');
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden" //Esconde o modal 
}