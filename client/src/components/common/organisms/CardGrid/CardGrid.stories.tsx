import { storiesOf } from "@storybook/react";
import { CardGrid } from "./CardGrid";

// FIXME: fix this after the correction of celebList type
storiesOf("Card Grid", module).add("Default", () => <CardGrid celebList={1} />);
