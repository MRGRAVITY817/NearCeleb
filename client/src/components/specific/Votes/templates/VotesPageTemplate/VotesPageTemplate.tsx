import { ReactChild } from "react";
import Head from "next/head";

interface VotesPageTemplateProps {
  added: ReactChild;
  edited: ReactChild;
  deleted: ReactChild;
}

export const VotesPageTemplate: React.FC<VotesPageTemplateProps> = ({
  added,
  edited,
  deleted,
}) => {
  return (
    <div>
      <Head>
        <title>Votes | Near Celeb</title>
      </Head>
      <div className="grid laptop:gap-12 gap-4 tablet:gap-8 grid-flow-row">
        {added}
        {edited}
        {deleted}
      </div>
    </div>
  );
};
