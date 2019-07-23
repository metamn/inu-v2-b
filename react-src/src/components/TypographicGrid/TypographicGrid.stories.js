import React from "react";
import { storiesOf } from "@storybook/react";

import TypographicGrid from "./TypographicGrid";
import description from "./TypographicGrid.md";

storiesOf("Typographic Grid", module).add(
  "Overview",
  () => (
    <TypographicGrid
      displayVerticalRhytm={true}
      displayHorizontalRhytm={true}
    />
  ),
  {
    notes: { markdown: description }
  }
);
