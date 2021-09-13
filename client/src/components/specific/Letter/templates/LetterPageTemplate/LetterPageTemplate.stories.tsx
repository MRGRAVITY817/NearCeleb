import { storiesOf } from "@storybook/react";
import { LetterPageTemplate } from "./LetterPageTemplate";
import { ContentMenu, LetterPaper, Submits, SubMenu } from "../../organisms";

storiesOf("Letter Page Template", module).add("Default", () => (
  <LetterPageTemplate
    contentMenu={<ContentMenu />}
    subMenu={<SubMenu />}
    letterPaper={
      <LetterPaper receiver="Harry Potter" sender="Albus Dumbledoor" />
    }
    submits={<Submits />}
  />
));
