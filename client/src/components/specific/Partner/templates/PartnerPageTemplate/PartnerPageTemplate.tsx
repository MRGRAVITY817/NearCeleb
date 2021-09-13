import { ReactChild } from "react";
import Head from "next/head";

interface PartnerPageTemplateProps {
  header: ReactChild;
  body: ReactChild;
}

export const PartnerPageTemplate: React.FC<PartnerPageTemplateProps> = ({
  header,
  body,
}) => {
  return (
    <div>
      <Head>
        <title>Partner | Near Celeb</title>
      </Head>
      <div className="grid laptop:gap-12 gap-4 grid-flow-row laptop:mb-12 mb-4 laptop:px-12 px-4">
        {header}
        {body}
      </div>
    </div>
  );
};
