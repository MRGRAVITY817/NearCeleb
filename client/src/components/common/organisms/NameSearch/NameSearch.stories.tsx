import { storiesOf } from "@storybook/react";
import { NameSearch } from "./NameSearch";

// FIXME: Fix setCelebList prop after celebList is typed other than any.
storiesOf("Name Search", module).add("Default", () => (
  <NameSearch setCelebList={() => console.log()} />
));
