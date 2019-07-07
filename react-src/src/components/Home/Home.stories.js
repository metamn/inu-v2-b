import React from "react";
import { storiesOf } from "@storybook/react";

import Home from "./Home";
import description from "./Home.md";

storiesOf("Home", module).add("Overview", () => <Home />, {
  notes: { markdown: description }
});
