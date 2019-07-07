import React from "react";
import { storiesOf } from "@storybook/react";

import Page from "./Page";
import description from "./Page.md";

storiesOf("Page", module).add("Overview", () => <Page />, {
  notes: { markdown: description }
});
