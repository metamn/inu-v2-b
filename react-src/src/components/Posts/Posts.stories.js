import React from "react";
import { storiesOf } from "@storybook/react";

import Posts, { PostsPropTypes, PostsDefaultProps } from "./Posts";
import description from "./Posts.md";

const PostsForStory = () => {
  const data = Posts({});
  return <p>Loads Posts from the database.</p>;
};

PostsForStory.propTypes = PostsPropTypes;
PostsForStory.defaultProps = PostsDefaultProps;

storiesOf("Posts", module).add("Overview", () => <PostsForStory />, {
  notes: { markdown: description }
});
