import React from "react";
import { storiesOf } from "@storybook/react";

import Pages from "./Pages";
import description from "./Pages.md";

storiesOf("Pages", module).add("Overview", () => <Pages />, {
  notes: { markdown: description }
});