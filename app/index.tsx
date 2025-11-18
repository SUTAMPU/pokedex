import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string,
    url: string,
  }
}

const colourByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

export default function Index() {

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
        })
      );
      setPokemons(detailedData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle= {{
        gap: 16,
        padding: 16,
    }}>
      {pokemons.map((pokemon, index) => (
        <Link 
          key={index}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            backgroundColor: colourByType[pokemon.types[0].type.name] + 50,
            padding: 20,
            borderRadius: 20,
          }}>

          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={{ flexDirection: "row"}}>
              <Image 
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150}}
              />
              <Image 
                source={{ uri: pokemon.imageBack }}
                style={{ width: 150, height: 150}}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  }
})