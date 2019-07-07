import React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "./Menu";
import description from "./Menu.md";

storiesOf("Menu", module).add("Overview", () => <Menu />, {
  notes: { markdown: description }
});
