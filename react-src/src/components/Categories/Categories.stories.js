import React from "react";
import { storiesOf } from "@storybook/react";

import Categories, {
  CategoriesPropTypes,
  CategoriesDefaultProps
} from "./Categories";
import description from "./Categories.md";

const CategoriesForStory = () => {
  const data = Categories();
  return <p>Loads Categories from the database.</p>;
};

CategoriesForStory.propTypes = CategoriesPropTypes;
CategoriesForStory.defaultProps = CategoriesDefaultProps;

storiesOf("Categories", module).add("Overview", () => <CategoriesForStory />, {
  notes: { markdown: description }
});
