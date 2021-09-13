import Head from "next/head";
import { ReactChild } from "react";

interface LetterPageTemplateProps {
  contentMenu: ReactChild;
  subMenu: ReactChild;
  letterPaper: ReactChild;
  submits: ReactChild;
}

export const LetterPageTemplate: React.FC<LetterPageTemplateProps> = ({
  contentMenu,
  subMenu,
  letterPaper,
  submits,
}) => {
  return (
    <div>
      <Head>
        <title>Letter | Near Celeb</title>
      </Head>
      <div className="grid laptop:gap-0 gap-12 grid-cols-1 laptop:grid-cols-2 items-start justify-center pb-12 pt-0 laptop:pt-12 px-4">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="laptop:mb-12 mb-4 w-full h-full">{contentMenu}</div>
          <div className="grid gap-4 grid-flow-row w-full">
            {subMenu}
            {submits}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {letterPaper}
        </div>
      </div>
    </div>
  );
};
