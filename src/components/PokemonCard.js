import React, { useEffect, useState } from "react";
import { fetchPokemon } from '../api';

const PokemonCard = ({pokemon}) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchPokemon(pokemon.name);
      setDetails(data);
    };
    loadDetails();
  }, [pokemon.name]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="pokemon-card">
      <h2>{details.name}</h2>
      <img src={details.sprites.front_default} alt={details.name} />
      <p>Type: {details.types.map(type => type.type.name).join(', ')}</p>
      <p>Height: {details.height}</p>
      <p>Weight: {details.weight}</p>
    </div>
  );
};

export default PokemonCard;

