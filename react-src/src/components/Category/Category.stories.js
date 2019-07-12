import React from "react";
import { storiesOf } from "@storybook/react";

import Category from "./Category";
import description from "./Category.md";

storiesOf("Category", module).add("Overview", () => <Category />, {
  notes: { markdown: description }
});
