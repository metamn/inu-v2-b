import React from "react";
import { storiesOf } from "@storybook/react";

import Content from "./Content";
import description from "./Content.md";

storiesOf("Content", module).add("Overview", () => <Content />, {
  notes: { markdown: description }
});
