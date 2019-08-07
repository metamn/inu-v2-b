import React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "./Menu";
import description from "./Menu.md";

storiesOf("Menu", module)
  .add("Overview", () => <Menu activeMenuItem="0" />, {
    notes: { markdown: description }
  })
  .add(
    "Toggled",
    () => <Menu activeMenuItem="0" menuSwitcherIconState={true} />,
    {
      notes: { markdown: description }
    }
  );
