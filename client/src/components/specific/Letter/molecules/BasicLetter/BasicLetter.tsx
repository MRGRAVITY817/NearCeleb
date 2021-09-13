import { useReactiveVar } from "@apollo/client";
import { letterPatternVar } from "../../reactiveVars";
import { LetterFormProps } from "../../organisms/LetterPaper/LetterPaper";

interface BasicLetterProps extends LetterFormProps {}

export const BasicLetter: React.FC<BasicLetterProps> = ({
  receiver,
  heading,
  body,
  ending,
  sender,
  signature,
}) => {
  const pattern = useReactiveVar(letterPatternVar);
  return (
    <div
      id="user-letter"
      style={{
        backgroundImage: `url(/LetterPatterns/${pattern}.png)`,
      }}
      className={`shadow-md w-3/4 h-full p-3 rounded-sm bg-repeat text-main bg-white`}
    >
      <div className="relative flex flex-col justify-between h-full">
        {receiver}
        {heading}
        {body}
        {ending}
        {sender}
        {signature}
      </div>
    </div>
  );
};
