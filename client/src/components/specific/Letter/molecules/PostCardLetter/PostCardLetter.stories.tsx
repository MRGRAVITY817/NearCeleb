import { storiesOf } from "@storybook/react";
import { PostCardLetter } from "./PostCardLetter";
import {
  LetterBody,
  LetterEnding,
  LetterHeading,
  LetterReceiver,
  LetterSender,
  LetterSignature,
} from "../../atoms";
import { useForm } from "react-hook-form";
import { LetterForm } from "../../reactiveVars";

storiesOf("Postcard Letter", module).add("Default", () => {
  const { register } = useForm<LetterForm>();
  return (
    <PostCardLetter
      receiver={<LetterReceiver register={register} required />}
      heading={<LetterHeading register={register} required />}
      body={<LetterBody register={register} required />}
      ending={<LetterEnding register={register} required />}
      sender={<LetterSender register={register} required />}
      signature={<LetterSignature />}
    />
  );
});
