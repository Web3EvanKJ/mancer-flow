import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_PONDER_URL, //  ponder server
  }),
  cache: new InMemoryCache(),
});
