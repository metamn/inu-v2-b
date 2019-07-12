import React from "react";
import { storiesOf } from "@storybook/react";

import Pages from "./Pages";
import description from "./Pages.md";

storiesOf("Pages", module).add(
  "Overview",
  () => {
    const data = Pages;
    return <p>Loads Pages from the database: {data}</p>;
  },
  {
    notes: { markdown: description }
  }
);
