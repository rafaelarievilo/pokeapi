const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

let getElement = element => document.querySelector(element) // função do querySelector

const   searchInput = getElement('.search-input'),
searchButton = getElement('.search-button'),
containerPokemon = getElement('.pokemon'),
erroMessage = getElement('.error');

var     pokeName, // nome ou numero passado na caixa de busca
pokemon, // responsavel por guardar info da api
card;   // responsavel por receber o HTML


function requestPokeInfo(url, name) {
     fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
            console.log(pokemon)    
        })
        .catch(err => console.log(err))
    }



function createCard() {
    card = `
        <div class="pokemon-picture">
            <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
        </div>
        <div class="pokemon-details">
            <h1 class="name">Name: ${pokemon.name}</h1>
            <h2 class="number">ID: ${pokemon.id}</h1>
            <h3 class="type">Type: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h1>
            <h3 class="skill">Skill: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h1>
            <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h1>
            <h3 class="height">Height: ${pokemon.height / 10}m</h1>
        </div>`
    return card;
}

function startApp(pokeName) {
    requestPokeInfo(baseURL, pokeName)

    setTimeout(function (){

        if(pokemon.details) {
            erroMessage.style.display = 'block';
            containerPokemon.style.display = 'none';
        } else {
            erroMessage.style.display = 'none';
            containerPokemon.style.display = 'flex';
            containerPokemon.innerHTML = createCard();
        }

    }, 2000)
}

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startApp(pokeName);
    containerPokemon.classList.add('fade')

    setTimeout(function() {
        containerPokemon.classList.remove('fade')
    }, 3000)
    
})



