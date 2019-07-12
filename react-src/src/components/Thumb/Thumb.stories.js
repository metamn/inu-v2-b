import React from "react";
import { storiesOf } from "@storybook/react";

import Thumb from "./Thumb";
import description from "./Thumb.md";

storiesOf("Thumb", module).add("Overview", () => <Thumb />, {
  notes: { markdown: description }
});
