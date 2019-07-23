import React from "react";
import { storiesOf } from "@storybook/react";

import Repeat from "./Repeat";
import description from "./Repeat.md";

storiesOf("Repeat", module).add("Overview", () => <Repeat />, {
  notes: { markdown: description }
});
