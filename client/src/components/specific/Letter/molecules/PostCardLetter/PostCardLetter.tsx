import { useReactiveVar } from "@apollo/client";
import { LetterFormProps } from "../../organisms/LetterPaper/LetterPaper";
import { letterPatternVar } from "../../reactiveVars";

interface PostCardLetterProps extends LetterFormProps {}

export const PostCardLetter: React.FC<PostCardLetterProps> = ({
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
      className={`flex w-full h-3/4 shadow-md overflow-y-hidden p-3 
                  rounded-sm text-main bg-white bg-repeat`}
    >
      <div className="relative flex w-full">
        <div className="flex flex-col justify-between w-1/2">
          {heading}
          {body}
          {ending}
        </div>
        {/* Card Middle Border */}
        <h1
          className={`border-l-1 mx-4 my-3 border-container border-opacity-70`}
        />
        <div className="flex flex-col justify-between w-1/2">
          {receiver}
          {sender}
          {signature}
        </div>
      </div>
    </div>
  );
};
