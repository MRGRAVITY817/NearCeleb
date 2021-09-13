import { storiesOf } from "@storybook/react";
import { HomePageTemplate } from "./HomePageTemplate";
import { About, Business, Intro, Subscribe, ThreeLines } from "../../organisms";

storiesOf("Home Page Template", module).add("Default", () => (
  <HomePageTemplate
    intro={<Intro />}
    subscribe={<Subscribe />}
    threeLines={<ThreeLines />}
    business={<Business />}
    about={<About />}
  />
));
