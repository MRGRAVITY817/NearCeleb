import { storiesOf } from "@storybook/react";
import { Button } from "./Button";

storiesOf("Button", module)
  .add("Default", () => <Button>Default</Button>)
  .add("Selected", () => <Button selected>Selected</Button>)
  .add("Not Selected", () => <Button selected={false}>Selected</Button>);
