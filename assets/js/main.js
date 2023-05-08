
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
          <img src="${pokemon.picture}" alt="${pokemon.name}">
        </div>
        
        
        
        <div id="pokemon-${pokemon.id}" class="tab">
        <button class="tablinks active" onclick="toggleTabs(event, 'stats')">Stats</button>
        <button class="tablinks" onclick="toggleTabs(event, 'abilities')">Abilities</button>
        
            <div id="stats" class="tabcontent">
                <ul>
                  ${pokemon.stats.map((stats => `<li>${stats.stat.name}: ${stats.base_stat}</li>`)).join('')}
                </ul>
            </div>
          
            <div id="abilities" class="tabcontent" style="display: none;">
                <ul>
                  ${pokemon.abilities.map((slot) => `<li>${slot.name}</li>`).join('')}
                </ul>
            </div>
        </div>
      </li>
    `).join('');
    pokemonLista.innerHTML += newHtml;

    // Adiciona o evento de clique nas abas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        // Esconde todas as abas e conteúdos
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach((tabContent) => {
          tabContent.classList.remove('active');
        });
        tabs.forEach((tab) => {
          tab.classList.remove('active');
        });

        // Mostra a aba e o conteúdo clicados
        const tabClicked = event.target;
        const tabContent = document.querySelector(`.tab-content[data-tab="${tabClicked.dataset.tab}"]`);
        tabClicked.classList.add('active');
        tabContent.classList.add('active');
      });
    });
  });
}

function toggleTabs(event, tabName) {
  const pokemonTab = event.currentTarget.parentNode;
  const tabcontent = pokemonTab.querySelectorAll('.tabcontent');
  const tablinks = pokemonTab.querySelectorAll('.tablinks');

  tabcontent.forEach((tab) => {
    tab.style.display = 'none';
  });

  tablinks.forEach((tab) => {
    tab.className = tab.className.replace(' active', '');
  });

  const tab = pokemonTab.querySelector(`#${tabName}`);
  tab.style.display = 'block';

  event.currentTarget.className += ' active';
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
