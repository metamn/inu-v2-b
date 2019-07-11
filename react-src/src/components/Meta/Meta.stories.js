import React from "react";
import { storiesOf } from "@storybook/react";

import Meta from "./Meta";
import description from "./Meta.md";

storiesOf("Meta", module).add("Overview", () => <Meta />, {
  notes: { markdown: description }
});
