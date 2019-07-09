import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "http://localhost/react-wp/graphql"
});

export default apolloClient;
