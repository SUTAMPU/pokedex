import { useEffect, useState } from "react";
import { Pokemon } from "./types";

export function usePokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //console.log(JSON.stringify(pokemons[0], null, 2));

  const fetchData = async () => {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit=10";
      const response = await fetch(url);
      const data = await response.json();

      // Fetch detailed info
      const detailedData = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailedResponse = await fetch(pokemon.url);
          const detailedData = await detailedResponse.json();
          return {
            name: pokemon.name,
            image: detailedData.sprites.front_default,
            imageBack: detailedData.sprites.back_default,
            types: detailedData.types,
          };
        }),
      );
      setPokemons(detailedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { pokemons };
}
