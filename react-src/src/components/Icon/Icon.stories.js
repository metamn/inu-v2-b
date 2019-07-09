import React from "react";
import { storiesOf } from "@storybook/react";

import Icon from "./Icon";
import description from "./Icon.md";

storiesOf("Icon", module).add("Overview", () => <Icon />, {
  notes: { markdown: description }
});
