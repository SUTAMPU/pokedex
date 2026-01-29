import { gql } from "@apollo/client";
import { client } from "./apolloClient";
import { Pokemon } from "./type";

const GET_POKEMONS = gql`
  query Pokemon_v2_pokemon($limit: Int) {
    pokemon_v2_pokemon(limit: $limit) {
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }

      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export async function getPokemons(limit = 10) {
  const { data } = await client.query<Pokemon>({
    query: GET_POKEMONS,
    variables: { limit },
  });

  return data!.pokemon_v2_pokemon;
}
