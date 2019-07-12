import React from "react";
import { storiesOf } from "@storybook/react";

import Slide from "./Slide";
import description from "./Slide.md";

storiesOf("Slide", module).add("Overview", () => <Slide />, {
  notes: { markdown: description }
});
