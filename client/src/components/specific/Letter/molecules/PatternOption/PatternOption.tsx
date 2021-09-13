import { useReactiveVar } from "@apollo/client";
import { letterPatternVar } from "../../reactiveVars";

const PatternOptions = [
  "Cream",
  "DiagonalWave",
  "FishnetsAndHearts",
  "FrenchStucco",
  "GroovePaper",
  "HandmadePaper",
  "LightPaperFibers",
  "LinedPaper",
  "NormalPaper",
  "SpirationLights",
  "WhiteWaves",
];

export const PatternOption = () => {
  const pattern = useReactiveVar(letterPatternVar);

  return (
    <div className="flex items-center justify-center laptop:mt-12 mt-4">
      <div className="grid grid-cols-4">
        <button
          onClick={() => letterPatternVar("blank")}
          className={`w-12 laptop:w-24 bg-white h-12 laptop:h-24 transition-all 
          hover:opacity-100 ${
            pattern === "blank" ? `opacity-100` : `opacity-50`
          }`}
        ></button>
        {PatternOptions.map((pOpt) => (
          <button
            key={pOpt}
            onClick={() => letterPatternVar(pOpt)}
            style={{ backgroundImage: `url(/LetterPatterns/${pOpt}.png)` }}
            className={`w-12 laptop:w-24 h-12 laptop:h-24 transition-all 
                        hover:opacity-100 focus:outline-none
                        ${pattern === pOpt ? `opacity-100` : `opacity-50`}`}
          ></button>
        ))}
      </div>
    </div>
  );
};
