import { storiesOf } from "@storybook/react";
import { BirthdaySlider } from "../../organisms/BirthdaySlider/BirthdaySlider";
import { TrendSlider } from "../../organisms/TrendSlider/TrendSlider";
import { TrendTemplate } from "./TrendTemplate";

storiesOf("Trend Template", module).add("Default", () => (
  <TrendTemplate
    trendSlider={<TrendSlider />}
    birthdaySlider={<BirthdaySlider />}
  />
));
