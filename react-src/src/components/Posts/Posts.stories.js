import React from "react";
import { storiesOf } from "@storybook/react";

import Posts from "./Posts";
import description from "./Posts.md";

storiesOf("Posts", module).add("Overview", () => <Posts />, {
  notes: { markdown: description }
});
