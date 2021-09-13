import { ReactChild } from "react";
import Head from "next/head";

interface HomePageTemplateProps {
  intro: ReactChild;
  threeLines: ReactChild;
  business: ReactChild;
  about: ReactChild;
  subscribe: ReactChild;
}

export const HomePageTemplate: React.FC<HomePageTemplateProps> = ({
  intro,
  threeLines,
  business,
  about,
  subscribe,
}) => {
  return (
    <div>
      <Head>
        <title>Home | Near Celeb</title>
      </Head>
      <div className="grid laptop:gap-12 gap-8 grid-flow-row laptop:pb-20 pb-8 laptop:px-20 px-8">
        {intro}
        {threeLines}
        {business}
        {about}
        {subscribe}
      </div>
    </div>
  );
};
