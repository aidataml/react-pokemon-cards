import React from "react";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import {useAxios} from "./hooks";

function PokeDex() {
  const [pokemon, addPokemon, clearPokemon] = useAxios(
    "pokemon",
    "https://pokeapi.co/api/v2/pokemon/"
  );
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Pick Your Pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={clearPokemon}>Delete Pokemon</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(card => (
          <PokemonCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
