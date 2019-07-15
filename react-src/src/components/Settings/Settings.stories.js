import React from "react";
import { storiesOf } from "@storybook/react";

import Settings, { SettingsPropTypes, SettingsDefaultProps } from "./Settings";
import description from "./Settings.md";

const SettingsForStory = () => {
  const data = Settings();
  return <p>Loads Settings from the database.</p>;
};

SettingsForStory.propTypes = SettingsPropTypes;
SettingsForStory.defaultProps = SettingsDefaultProps;

storiesOf("Settings", module).add("Overview", () => <SettingsForStory />, {
  notes: { markdown: description }
});
