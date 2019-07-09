import React from "react";
import { storiesOf } from "@storybook/react";

import Categories from "./Categories";
import description from "./Categories.md";

storiesOf("Categories", module).add(
  "Overview",
  () => {
    const data = Categories;
    return <p>Loads Categories from the database: {data}</p>;
  },
  {
    notes: { markdown: description }
  }
);
