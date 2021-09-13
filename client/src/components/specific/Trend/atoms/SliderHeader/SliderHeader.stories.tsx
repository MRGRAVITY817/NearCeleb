import { storiesOf } from "@storybook/react";
import { SliderHeader } from "./SliderHeader";
storiesOf("Slider Header", module).add("Default", () => (
  <SliderHeader main="Main" sub="Sub" />
));
