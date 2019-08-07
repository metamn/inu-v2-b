import React from "react";
import { storiesOf } from "@storybook/react";

import Repeat from "./Repeat";
import description from "./Repeat.md";

storiesOf("Repeat", module).add(
  "3 times",
  () => (
    <Repeat numberOfTimes={3} startAt={1}>
      {i => <p>Item #{i}</p>}
    </Repeat>
  ),
  {
    notes: { markdown: description }
  }
);
