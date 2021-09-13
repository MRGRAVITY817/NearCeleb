import { storiesOf } from "@storybook/react";
import { SearchCeleb } from "../../../../common/organisms/SearchCeleb/SearchCeleb";
import { CelebsPageTemplate } from "./CelebsPageTemplate";

storiesOf("Celebs Page Template", module).add("Default", () => (
  <CelebsPageTemplate searchCeleb={<SearchCeleb />} />
));
