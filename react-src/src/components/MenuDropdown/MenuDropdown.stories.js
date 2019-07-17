import React from "react";
import { storiesOf } from "@storybook/react";

import MenuDropdown from "./MenuDropdown";
import description from "./MenuDropdown.md";

storiesOf("MenuDropdown", module).add("Overview", () => <MenuDropdown />, {
  notes: { markdown: description }
});
