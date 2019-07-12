import React from "react";
import { storiesOf } from "@storybook/react";

import Posts from "./Posts";
import description from "./Posts.md";

storiesOf("Posts", module).add(
  "Overview",
  () => {
    const data = Posts;
    return <p>Loads Posts from the database: {data}</p>;
  },
  {
    notes: { markdown: description }
  }
);
