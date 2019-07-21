import React from "react";
import { storiesOf } from "@storybook/react";

import MenuItem from "./MenuItem";
import description from "./MenuItem.md";

storiesOf("MenuItem", module).add("With default props", () => <MenuItem />, {
  notes: { markdown: description }
});
