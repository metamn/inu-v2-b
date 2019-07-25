import React from "react";

import { ApolloProvider } from "react-apollo-hooks";
import apolloClient from "./apolloClient.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import StyleGuide from "./components/StyleGuide";

// A base name has to be set up on localhost
const baseName = process.env.NODE_ENV === "development" ? "/react-wp" : "";

const App = () => {
  return (
    <Router basename={baseName}>
      <Switch>
        <Route path="/styleguide" component={StyleGuide} />
        <ApolloProvider client={apolloClient}>
          <Route path="/" component={Home} />
        </ApolloProvider>
      </Switch>
    </Router>
  );
};

export default App;
