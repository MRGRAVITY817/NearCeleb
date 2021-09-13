import { useReactiveVar } from "@apollo/client";
import { letterCelebNameVar, letterFontVar } from "../../reactiveVars";

const FontOptions = [
  "font-charmonman",
  "font-league",
  "font-bad",
  "font-dancing",
  "font-sofia",
  "font-clicker",
  "font-schoolbell",
  "font-cedarville",
];

export const FontOption = () => {
  const font = useReactiveVar(letterFontVar);
  const receiver = useReactiveVar(letterCelebNameVar);
  return (
    <div className="grid grid-cols-2 px-3">
      {FontOptions.map((opt) => (
        <button
          key={opt}
          onClick={() => letterFontVar(opt)}
          className={`desktop:text-2xl laptop:text-xl desktop:p-8 laptop:p-4 p-2 tablet  bg-white focus:outline-none transition-all 
                      ${
                        opt === font
                          ? `bg-opacity-100 text-container`
                          : `bg-opacity-50 text-white`
                      } ${opt}`}
        >
          {`To. ${receiver}`}
        </button>
      ))}
    </div>
  );
};
