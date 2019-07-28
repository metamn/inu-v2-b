import ApolloClient from "apollo-boost";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost/react-wp/graphql"
    : "http://inu.ro/graphql";

const apolloClient = new ApolloClient({
  uri: uri
});

export default apolloClient;
