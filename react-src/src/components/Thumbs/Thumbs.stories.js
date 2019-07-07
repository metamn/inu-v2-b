import React from "react";
import { storiesOf } from "@storybook/react";

import Thumbs from "./Thumbs";
import description from "./Thumbs.md";

storiesOf("Thumbs", module).add("Overview", () => <Thumbs />, {
  notes: { markdown: description }
});
