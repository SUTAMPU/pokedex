import { colourByType } from "@/src/colours";
import { usePokemon } from "@/src/rest/usePokemons";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export default function Index() {
  const { pokemons } = usePokemon();

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon, index) => (
        <Link
          key={index}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            backgroundColor: colourByType[pokemon.types[0].type.name] + 50,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View style={styles.wrapper}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: pokemon.image }} style={styles.image} />
              <Image source={{ uri: pokemon.imageBack }} style={styles.image} />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}
