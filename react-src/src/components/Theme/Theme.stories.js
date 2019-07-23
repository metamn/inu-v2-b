import React from "react";
import { storiesOf } from "@storybook/react";

import Theme from "./Theme";
import description from "./Theme.md";

storiesOf("Theme", module).add("Overview", () => <Theme />, {
  notes: { markdown: description }
});
