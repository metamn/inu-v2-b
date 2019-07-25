import React from "react";
import { storiesOf } from "@storybook/react";

import { CategoriesDefaultProps } from "../Categories";
import Menu from "./Menu";
import description from "./Menu.md";

storiesOf("Menu", module).add("Overview", () => <Menu categories={{}} />, {
  notes: { markdown: description }
});
