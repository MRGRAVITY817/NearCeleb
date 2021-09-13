import { useReactiveVar } from "@apollo/client";
import { UseFormRegister } from "react-hook-form";
import {
  letterFontVar,
  LetterForm,
  letterOutlineVar,
} from "../../reactiveVars";

const commonStyle = (outline: boolean, font: string) =>
  `bg-transparent align-middle outline-none resize-none p-1 
   border-1 laptop:border-2 border-container font-normal transition-all
   ${outline ? `border-opacity-50 hover:border-main` : `border-opacity-0`}
   ${font}`;

const commonFontSize = "1vw";

interface LetterTextareaProps {
  register: UseFormRegister<LetterForm>;
  required: boolean;
}
interface LetterReceiverProps extends LetterTextareaProps {}
interface LetterHeadingProps extends LetterTextareaProps {}
interface LetterBodyProps extends LetterTextareaProps {}
interface LetterEndingProps extends LetterTextareaProps {}
interface LetterSenderProps extends LetterTextareaProps {}

export const LetterReceiver: React.FC<LetterReceiverProps> = ({
  register,
  required,
}) => {
  const outline = useReactiveVar(letterOutlineVar);
  const font = useReactiveVar(letterFontVar);
  const style = commonStyle(outline, font);
  const fontSize = commonFontSize;
  return (
    <div>
      <textarea
        rows={1}
        style={{ fontSize: `${fontSize}` }}
        className={`${style} w-full`}
        readOnly
        {...register("receiver", { required })}
      />
    </div>
  );
};

export const LetterHeading: React.FC<LetterHeadingProps> = ({
  register,
  required,
}) => {
  const outline = useReactiveVar(letterOutlineVar);
  const font = useReactiveVar(letterFontVar);
  const style = commonStyle(outline, font);
  const fontSize = commonFontSize;
  return (
    <div>
      <textarea
        rows={3}
        style={{ fontSize: `${fontSize}` }}
        className={`${style} w-full`}
        {...register("heading", { required })}
      />
    </div>
  );
};

export const LetterBody: React.FC<LetterBodyProps> = ({
  register,
  required,
}) => {
  const outline = useReactiveVar(letterOutlineVar);
  const font = useReactiveVar(letterFontVar);
  const style = commonStyle(outline, font);
  const fontSize = commonFontSize;
  return (
    <div>
      <textarea
        rows={10}
        style={{ fontSize: `${fontSize}` }}
        className={`${style} w-full`}
        {...register("body", { required })}
      />
    </div>
  );
};

export const LetterEnding: React.FC<LetterEndingProps> = ({
  register,
  required,
}) => {
  const outline = useReactiveVar(letterOutlineVar);
  const font = useReactiveVar(letterFontVar);
  const style = commonStyle(outline, font);
  const fontSize = commonFontSize;
  return (
    <div>
      <textarea
        rows={3}
        style={{ fontSize: `${fontSize}` }}
        className={`${style} w-full`}
        {...register("ending", { required })}
      />
    </div>
  );
};

export const LetterSender: React.FC<LetterSenderProps> = ({
  register,
  required,
}) => {
  const outline = useReactiveVar(letterOutlineVar);
  const font = useReactiveVar(letterFontVar);
  const style = commonStyle(outline, font);
  const fontSize = commonFontSize;
  return (
    <div>
      <textarea
        rows={1}
        style={{ fontSize: `${fontSize}` }}
        className={`${style} w-full`}
        readOnly
        {...register("sender", { required })}
      />
    </div>
  );
};
