import { PokemonTypeName } from "../colours";

interface GraphQLPokemon {
  name: string;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: PokemonTypeName;
    };
  }[];
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
}

export interface Pokemon {
  pokemon_v2_pokemon: GraphQLPokemon[];
}
