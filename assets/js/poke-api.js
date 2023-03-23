

const pokeApi = {}


pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((pokemonsTojson) => pokemonsTojson.json())
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    
    const urlpokeapi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}://pokeapi.co/api/v2/pokemon/ditto`;
    return fetch(urlpokeapi)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails()))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => {
            console.log(pokemonDetails)
        })
        .catch((error) => console.error(error))

}

