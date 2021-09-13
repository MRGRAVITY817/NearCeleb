import { useReactiveVar } from "@apollo/client";
import { letterPaperVar } from "../../reactiveVars";

export const PaperOption = () => {
  const paper = useReactiveVar(letterPaperVar);
  return (
    <div className={`flex justify-center items-center laptop:my-8 my-4`}>
      <button
        onClick={() => letterPaperVar("basic")}
        className={`h-16 w-12 bg-white laptop:h-32 laptop:w-24 mx-2 focus:outline-none transition-all ${
          paper === "basic"
            ? `bg-opacity-100 text-container`
            : `bg-opacity-50 text-white`
        }`}
      >
        Basic
      </button>
      <button
        onClick={() => letterPaperVar("postcard")}
        className={`h-12 w-16 bg-white laptop:h-24 laptop:w-32 mx-2 focus:outline-none transition-all ${
          paper === "postcard"
            ? `bg-opacity-100 text-container`
            : `bg-opacity-50 text-white`
        }`}
      >
        Post Card
      </button>
    </div>
  );
};
