import { storiesOf } from "@storybook/react";
import { PricingItem } from "./PricingItem";

storiesOf("Pricing Item", module).add("Default", () => (
  <PricingItem
    title="Title"
    bgCover="/pricing/cloudLetters.jpg"
    content="This is the content"
    price={1}
  />
));
