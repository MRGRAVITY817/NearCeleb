import Head from "next/head";
import { ReactChild, useState } from "react";

interface CelebsPageTemplate {
  searchCeleb: ReactChild;
}

export const CelebsPageTemplate: React.FC<CelebsPageTemplate> = ({
  searchCeleb,
}) => {
  return (
    <div>
      <Head>
        <title>Celebs | Near Celeb</title>
      </Head>
      <div className="laptop:px-12 px-4 laptop:py-12 py-6 min-h-screen">
        {searchCeleb}
      </div>
    </div>
  );
};
