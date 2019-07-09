import React from "react";
import { storiesOf } from "@storybook/react";

import Settings from "./Settings";
import description from "./Settings.md";

storiesOf("Settings", module).add(
  "Overview",
  () => {
    const data = Settings;
    return <p>Loads site settings from the database: {data}</p>;
  },
  {
    notes: { markdown: description }
  }
);
