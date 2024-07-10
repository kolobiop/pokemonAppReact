const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async(offset = 0, limit = 2)=>{
    const response  = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.json();
};

export const fetchPokemon = async (name)=> {
    const response = await fetch(`${API_URL}/pokemon/${name}`);
    return response.json();
};

export const fetchTypes = async () => {
    const response = await fetch(`${API_URL}/type`);
    return response.json(); 
  };