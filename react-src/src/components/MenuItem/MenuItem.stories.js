import React from "react";
import { storiesOf } from "@storybook/react";

import MenuItem from "./MenuItem";
import description from "./MenuItem.md";

storiesOf("MenuItem", module)
  .add("With default props", () => <MenuItem />, {
    notes: { markdown: description }
  })
  .add("With status active", () => <MenuItem status="active" />, {
    notes: { markdown: description }
  })
  .add("With status inactive", () => <MenuItem status="inactive" />, {
    notes: { markdown: description }
  })
  .add("With status hidden", () => <MenuItem status="hidden" />, {
    notes: { markdown: description }
  })
  .add(
    "With status activeUntoggled",
    () => <MenuItem status="activeUntoggled" />,
    {
      notes: { markdown: description }
    }
  );
