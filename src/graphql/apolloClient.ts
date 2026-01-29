import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Initialise Apollo Client
export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://beta.pokeapi.co/graphql/v1beta" }),
  cache: new InMemoryCache(),
});
