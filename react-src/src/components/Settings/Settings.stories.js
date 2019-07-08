import React from "react";
import { storiesOf } from "@storybook/react";

import Settings from "./Settings";
import description from "./Settings.md";

storiesOf("Settings", module).add("Overview", () => <Settings />, {
  notes: { markdown: description }
});
