import React from "react";
import { storiesOf } from "@storybook/react";

import { Section } from "./SemanticHTML";
import description from "./SemanticHTML.md";

storiesOf("SemanticHTML", module).add(
  "Overview",
  () => (
    <Section elementName="section" title="Section">
      Section
    </Section>
  ),
  {
    notes: { markdown: description }
  }
);
