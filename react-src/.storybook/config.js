import React from "react";
import { addParameters, addDecorator, configure } from "@storybook/react";
import theme from "./theme";

// Console imports ... more complicated than the rest
import { withConsole } from "@storybook/addon-console";
import { setConsoleOptions } from "@storybook/addon-console";
import "@storybook/addon-console";

// Info support
import { withInfo } from "@storybook/addon-info";

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
    source: false
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
