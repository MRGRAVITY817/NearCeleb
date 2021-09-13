import { storiesOf } from "@storybook/react";
import { SliderButton } from "./SliderButton";

storiesOf("Slider Button", module)
  .add("Left", () => (
    <SliderButton direction="left" onClick={() => console.log("Left")} />
  ))
  .add("Right", () => (
    <SliderButton direction="right" onClick={() => console.log("Right")} />
  ));
