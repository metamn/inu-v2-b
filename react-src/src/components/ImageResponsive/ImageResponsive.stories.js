import React from "react";
import { storiesOf } from "@storybook/react";

import ImageResponsive from "./ImageResponsive";
import description from "./ImageResponsive.md";

storiesOf("ImageResponsive", module).add(
  "Overview",
  () => <ImageResponsive />,
  {
    notes: { markdown: description }
  }
);
