

const pokeApi = {}


function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    //Primeira posição do array
    // pokemon.type = pokemonDetail.types.get(0);
    pokemon.type = type
    
    pokemon.picture = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    
    const urlpokeapi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}://pokeapi.co/api/v2/pokemon/ditto`;
    return fetch(urlpokeapi)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonss) => pokemonss.map(pokeApi.getPokemonsDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
        

}