import React from "react";
import { storiesOf } from "@storybook/react";

import IconToggle from "./IconToggle";
import description from "./IconToggle.md";

storiesOf("IconToggle", module).add("Overview", () => <IconToggle />, {
  notes: { markdown: description }
});
