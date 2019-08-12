import React from "react";
import { addParameters, addDecorator, configure } from "@storybook/react";
import theme from "./theme";

// Console imports ... more complicated than the rest
import { withConsole } from "@storybook/addon-console";
import { setConsoleOptions } from "@storybook/addon-console";
import "@storybook/addon-console";

// Info support
import { withInfo } from "@storybook/addon-info";

// The Apollo decorator
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "../src/apolloClient";

addDecorator(story => (
  <ApolloProvider client={apolloClient}>{story()}</ApolloProvider>
));

// Theme decorator
import { switchThemeFrom } from "../src/components/Theme";
import { ThemeContext } from "../src/components/Home";
const starterTheme = switchThemeFrom("dark");

addDecorator(story => (
  <ThemeContext.Provider value={starterTheme}>{story()}</ThemeContext.Provider>
));

// General settings
addParameters({
  options: {
    theme: theme,
    panelPosition: "right"
  }
});

// Info settings
addDecorator(
  withInfo({
    inline: true,
    source: false,
    propTablesExclude: [ApolloProvider]
  })
);

// Console settings
setConsoleOptions({
  panelExclude: []
});
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// Load stories into the sidebar
const req = require.context("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
