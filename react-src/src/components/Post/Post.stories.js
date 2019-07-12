import React from "react";
import { storiesOf } from "@storybook/react";

import Post from "./Post";
import description from "./Post.md";

storiesOf("Post", module).add("Overview", () => <Post />, {
  notes: { markdown: description }
});
