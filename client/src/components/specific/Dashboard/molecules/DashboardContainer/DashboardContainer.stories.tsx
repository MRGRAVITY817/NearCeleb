import { storiesOf } from "@storybook/react";
import { DashboardContainer } from "./DashboardContainer";

storiesOf("Dashboard Container", module).add("Default", () => (
  <DashboardContainer
    header="This is header"
    contents={<div>This is contents</div>}
  />
));
