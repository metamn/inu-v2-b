import React from "react";
import { storiesOf } from "@storybook/react";

import Slides, { SlidesPropTypes, SlidesDefaultProps } from "./Slides";
import description from "./Slides.md";

const SlidesForStory = () => {
  const { slidesRendered } = Slides({ edges: [] });
  return <>{slidesRendered}</>;
};

SlidesForStory.propTypes = SlidesPropTypes;
SlidesForStory.defaultProps = SlidesDefaultProps;

storiesOf("Slides", module).add("Overview", () => <SlidesForStory />, {
  notes: { markdown: description }
});
