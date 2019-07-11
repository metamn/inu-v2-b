import React from "react";
import { storiesOf } from "@storybook/react";

import Slides from "./Slides";
import description from "./Slides.md";

storiesOf("Slides", module).add("Overview", () => <Slides />, {
  notes: { markdown: description }
});
