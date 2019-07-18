import React from "react";
import { storiesOf } from "@storybook/react";

import PlaceholderImage from "./PlaceholderImage";
import description from "./PlaceholderImage.md";

storiesOf("PlaceholderImage", module).add(
  "Overview",
  () => <PlaceholderImage />,
  {
    notes: { markdown: description }
  }
);
