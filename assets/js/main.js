
const pokemonLista = document.getElementById('pokemonLista');
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
const maxRecords = 151;


function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.picture}"
                  alt="${pokemon.name}">
          </div>
          <div class="pokemonskills">
            <div class="stats">
              <h4>Stats</h4>
              <ul>
              ${pokemon.stats.map((stats => `<li>${stats.stat.name}: ${stats.base_stat}</li>`)).join('')}
              </ul>
            </div>
            <div class="abilities">
              <h4>Abilities</h4>
                <ul>
                  ${pokemon.abilities.map((slot) => `<li>${slot.name}</li>`).join('')}
                </ul>
            </div>

          </div>
      </li>
  `).join('')
    pokemonLista.innerHTML += newHtml;

  })

}

loadPokemons(offset, limit);


loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRercordsNextPage = offset + limit;

  if (qtdRercordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemons(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)

  } else {
    loadPokemons(offset, limit);
  }

})
