import React from "react";
import { storiesOf } from "@storybook/react";

import Reset from "./Reset";
import description from "./Reset.md";

storiesOf("Reset", module).add("Overview", () => <Reset />, {
  notes: { markdown: description }
});
