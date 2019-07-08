import React from "react";
import { storiesOf } from "@storybook/react";

import Logo from "./Logo";
import description from "./Logo.md";

storiesOf("Logo", module).add("Overview", () => <Logo />, {
  notes: { markdown: description }
});
