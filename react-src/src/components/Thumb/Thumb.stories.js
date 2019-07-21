import React from "react";
import { storiesOf } from "@storybook/react";

import Thumb from "./Thumb";
import description from "./Thumb.md";

storiesOf("Thumb", module)
  .add("With no props", () => <Thumb />, {
    notes: { markdown: description }
  })
  .add("Active", () => <Thumb isActive={true} />, {
    notes: { markdown: description }
  });
