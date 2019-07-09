import React from "react";

import { ApolloProvider } from "react-apollo-hooks";
import apolloClient from "./apolloClient.js";

import Home from "./components/Home";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
