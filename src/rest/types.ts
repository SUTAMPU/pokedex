import { PokemonTypeName } from "../colours";

export interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: PokemonTypeName;
    url: string;
  };
}
