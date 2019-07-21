import React from "react";
import { storiesOf } from "@storybook/react";

import Link from "./Link";
import description from "./Link.md";

storiesOf("Link", module).add("Overview", () => <Link />, {
  notes: { markdown: description }
});
