import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import Home from "./components/Home";

const client = new ApolloClient({
  uri: "http://localhost/react-wp/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
