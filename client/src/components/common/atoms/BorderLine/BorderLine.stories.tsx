import { storiesOf } from "@storybook/react";
import { BorderLine } from "./BorderLine";

storiesOf("BorderLine", module)
  .add("Default", () => <BorderLine />)
  .add("Black Horizontal", () => <BorderLine color="black" horizontal />)
  .add("Black Vertical", () => <BorderLine color="black" horizontal={false} />)
  .add("White Horizontal", () => (
    <div style={{ padding: `10px 10px 10px 10px`, backgroundColor: `black` }}>
      <BorderLine color="white" horizontal />
    </div>
  ))
  .add("White Vertical", () => (
    <div style={{ padding: `10px`, backgroundColor: `black` }}>
      <BorderLine color="white" horizontal={false} />
    </div>
  ));
