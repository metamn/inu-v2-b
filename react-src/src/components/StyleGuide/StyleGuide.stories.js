import React from "react";
import { storiesOf } from "@storybook/react";

import StyleGuide from "./StyleGuide";
import description from "./StyleGuide.md";

storiesOf("StyleGuide", module)
  .add("Light", () => <StyleGuide colorScheme="light" />, {
    notes: { markdown: description }
  })
  .add("Dark", () => <StyleGuide colorScheme="dark" />, {
    notes: { markdown: description }
  });
