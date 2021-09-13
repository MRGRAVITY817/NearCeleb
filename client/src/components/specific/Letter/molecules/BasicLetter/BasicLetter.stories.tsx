import { storiesOf } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
  LetterBody,
  LetterEnding,
  LetterHeading,
  LetterReceiver,
  LetterSender,
  LetterSignature,
} from "../../atoms";
import { LetterForm } from "../../reactiveVars";
import { BasicLetter } from "./BasicLetter";

storiesOf("Basic Letter", module).add("Default", () => {
  const { register } = useForm<LetterForm>();
  return (
    <BasicLetter
      receiver={<LetterReceiver register={register} required />}
      heading={<LetterHeading register={register} required />}
      body={<LetterBody register={register} required />}
      ending={<LetterEnding register={register} required />}
      sender={<LetterSender register={register} required />}
      signature={<LetterSignature />}
    />
  );
});
