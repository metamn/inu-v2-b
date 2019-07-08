import React from "react";
import { storiesOf } from "@storybook/react";

import Main from "./Main";
import description from "./Main.md";

storiesOf("Main", module).add("Overview", () => <Main />, {
  notes: { markdown: description }
});
