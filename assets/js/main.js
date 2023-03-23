


const pokemonLista = document.getElementById('pokemonList');


function convertPokemontoLi(pokemon) {

  return /*html*/`
          <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="${pokemon.name}">
                </div>
            </li>
        `
};

pokeApi.getPokemons().then((pokemons = []) => {

  pokemonLista.innerHTML += pokemons.map(convertPokemontoLi).join('');

})


