import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { Button } from "../../../../common/atoms/Button/Button";
import { Refresh } from "../../../../common/atoms/Refresh/Refresh";
import { letterContentVar, letterHeadingVar } from "../../reactiveVars";

const headingSentences = (sender: string, receiver: string) => [
  `Hello ${receiver}, My name is ${sender}. I am your big fan.`,
  `Hi ${receiver}! I am Seong Hoon, your biggest fan.`,
  `How is it going ${receiver}? Happy new year!`,
  `Long time no see ${receiver}! How have you been?`,
  `Time flies really. It's good to send you a letter again, ${receiver}.`,
  `My hero ${receiver}, you have no idea how I feel now writing this letter.`,
  `Hello ${receiver}, I've heard some happy news about you.`,
  `It's already ${new Date().getMonth()}, and I wonder how you are doing, ${receiver}.`,
];

export const HeadingMenu = () => {
  const content = useReactiveVar(letterContentVar);
  const receiver = content.receiver;
  const sender = content.sender;
  const [start, setStart] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<string[]>(
    headingSentences(sender, receiver).slice(0, 3)
  );
  const [currRec, setCurrRec] = useState<string>("");
  const refreshRecommendation = (recommendations: string[]) => {
    if (start + 3 > recommendations.length) setStart(0);
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
            refreshRecommendation(headingSentences(sender, receiver))
          }
        />
      </div>
      <div className="grid gap-2 grid-cols-1">
        {recommendations.map((value) => (
          <Button
            key={value}
            onClick={() => {
              letterHeadingVar(value);
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
