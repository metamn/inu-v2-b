import React from "react";
import { storiesOf } from "@storybook/react";

import Contact from "./Contact";
import description from "./Contact.md";

storiesOf("Contact", module).add("Overview", () => <Contact />, {
  notes: { markdown: description }
});
