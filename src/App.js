import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from './api';
import TypeFilter from './components/TypeFilter';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import NotFoundPopup from './components/NotFoundPopup';
import PokemonCard from './components/PokemonCard';
import './App.css'; 

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [notFound, setNotFound] = useState(false);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadPokemon = async () => {
      if (selectedType) {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const data = await response.json();
        setPokemonList(data.pokemon.map(p => p.pokemon).slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
        setTotalPages(Math.ceil(data.pokemon.length / ITEMS_PER_PAGE));
      } else {
        const data = await fetchPokemonList((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
        setPokemonList(data.results);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      }
    };
    loadPokemon();
  }, [currentPage, selectedType]);

  const handleSearch = async (name) => {
    try {
      const data = await fetchPokemonList(0, 1000); // Aumenta la lista
      const filteredPokemon = data.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredPokemon.length === 0) {
        setNotFound(true);
      } else {
        setPokemonList(filteredPokemon);
        setNotFound(false);
      }
    } catch (error) {
      setNotFound(true);
    }
  };

  const handleTypeSelect = async (type) => {
    setSelectedType(type);
    if (type) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      setPokemonList(data.pokemon.map(p => p.pokemon));
    } else {
      const data = await fetchPokemonList(0, ITEMS_PER_PAGE);
      setPokemonList(data.results);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Pokémon App KOP</h1>
      <div className="search-filter-container">
        <SearchBar onSearch={handleSearch} />
        <TypeFilter onTypeSelect={handleTypeSelect} />
      </div>
      {notFound && <NotFoundPopup onClose={() => setNotFound(false)} />}
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
