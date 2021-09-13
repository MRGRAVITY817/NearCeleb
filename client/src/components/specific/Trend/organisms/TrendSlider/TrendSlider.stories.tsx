import { storiesOf } from "@storybook/react";
import { TrendSlider } from "./TrendSlider";

storiesOf("Trend Slider", module).add("Default", () => (
  <div className="p-8 bg-main">
    <TrendSlider />
  </div>
));
