import { storiesOf } from "@storybook/react";
import { FollowingList } from "./FollowingList";

storiesOf("FollowingList", module).add("Default", () => (
  <FollowingList userId={1} />
));
