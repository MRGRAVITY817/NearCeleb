import { storiesOf } from "@storybook/react";
import { LetterPaper } from "./LetterPaper";

storiesOf("Letter Paper", module).add("Default", () => (
  <LetterPaper receiver="Harry Potter" sender="Albus Dumbledoor" />
));
