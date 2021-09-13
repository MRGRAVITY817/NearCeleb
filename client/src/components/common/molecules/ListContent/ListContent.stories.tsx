import { storiesOf } from "@storybook/react";
import { ListContent } from "./ListContent";

storiesOf("List Content", module).add("Default", () => (
  <ListContent title="Title" contents={["Content1", "Content2"]} />
));
