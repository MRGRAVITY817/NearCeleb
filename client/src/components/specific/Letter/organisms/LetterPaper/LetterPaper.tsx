import { ReactiveVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { ReactChild } from "react";
import { useForm } from "react-hook-form";
import {
  LetterBody,
  LetterEnding,
  LetterHeading,
  LetterReceiver,
  LetterSender,
  LetterSignature,
} from "../../atoms";
import { BasicLetter, PostCardLetter } from "../../molecules";
import {
  letterContentVar,
  letterEndingVar,
  LetterForm,
  letterHeadingVar,
  letterOutlineVar,
  letterPaperVar,
  letterSubmitVar,
} from "../../reactiveVars";

export interface LetterFormProps {
  receiver: ReactChild;
  heading: ReactChild;
  body: ReactChild;
  ending: ReactChild;
  sender: ReactChild;
  signature: ReactChild;
}

interface LetterPaperProps {
  receiver: string;
  sender: string;
}

export const LetterPaper: React.FC<LetterPaperProps> = ({
  receiver,
  sender,
}) => {
  const paper = useReactiveVar(letterPaperVar);
  const submit = useReactiveVar(letterSubmitVar);
  const heading = useReactiveVar(letterHeadingVar);
  const ending = useReactiveVar(letterEndingVar);
  const { register, getValues, setValue } = useForm<LetterForm>({
    mode: "onChange",
    defaultValues: {
      receiver: `To. ${receiver}`,
      sender: `From. ${sender}`,
    },
  });
  const submitLetterContent = (
    content: LetterForm,
    rxVar: ReactiveVar<LetterForm>
  ) => rxVar(content);
  useEffect(() => {
    if (submit) {
      letterOutlineVar(false);
      submitLetterContent(getValues(), letterContentVar);
    }
  }, [submit]);
  useEffect(() => {
    setValue("heading", getValues().heading + heading);
  }, [heading]);
  useEffect(() => {
    setValue("ending", getValues().ending + ending);
  }, [ending]);
  return (
    <form className="laptop:w-40vw laptop:h-40vw w-90vw h-90vw flex items-center justify-center">
      {paper === "basic" ? (
        <BasicLetter
          receiver={<LetterReceiver register={register} required />}
          heading={<LetterHeading register={register} required />}
          body={<LetterBody register={register} required />}
          ending={<LetterEnding register={register} required />}
          sender={<LetterSender register={register} required />}
          signature={<LetterSignature />}
        />
      ) : (
        <PostCardLetter
          receiver={<LetterReceiver register={register} required />}
          heading={<LetterHeading register={register} required />}
          body={<LetterBody register={register} required />}
          ending={<LetterEnding register={register} required />}
          sender={<LetterSender register={register} required />}
          signature={<LetterSignature />}
        />
      )}
    </form>
  );
};
