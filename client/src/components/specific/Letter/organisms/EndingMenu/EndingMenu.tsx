import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { Button } from "../../../../common/atoms/Button/Button";
import { Refresh } from "../../../../common/atoms/Refresh/Refresh";
import { letterContentVar, letterEndingVar } from "../../reactiveVars";

const endingSentences = (sender: string, receiver: string) => [
  `Anyway, have fun with recording your album. I am really looking forward to it!`,
  `I will keep sending you a letter every week. This website is awesome :D`,
  `So that was all I wanted to say to you. I will keep in touch with you sometimes later.`,
];

export const EndingMenu = () => {
  const content = useReactiveVar(letterContentVar);
  const receiver = content.receiver.slice(4);
  const sender = content.sender.slice(5);
  const [start, setStart] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<string[]>(
    endingSentences(sender, receiver).slice(0, 3)
  );
  const [currRec, setCurrRec] = useState<string>("");
  const refreshRecommendation = (recommendations: string[]) => {
    if (start + 3 > recommendations.length - 1) setStart(0);
    else setStart(start + 3);
    setRecommendations(recommendations.slice(start, start + 3));
  };
  return (
    <div className="my-4">
      {/* Recommendation */}
      <div className="flex items-center justify-start my-4">
        <h1 className="mr-4 text-lg italic font-medium">Recommendations </h1>
        <Refresh
          onClick={() =>
            refreshRecommendation(endingSentences(sender, receiver))
          }
        />
      </div>
      <div className="grid gap-2 grid-cols-1">
        {recommendations.map((value) => (
          <Button
            key={value}
            onClick={() => {
              letterEndingVar(value);
              setCurrRec(value);
            }}
            selected={value === currRec}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
};
