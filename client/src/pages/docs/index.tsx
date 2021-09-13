import { NextPage } from "next";
import Head from "next/head";

export const DocsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Docs | Near Celeb</title>
      </Head>
      <div className="laptop:py-18 p-12 laptop:px-32">
        <div className="flex flex-col items-center justify-center py-12 h-full border-2 border-white rounded-xl lg:p-32">
          <h1 className="text-center text-white text-5xl">
            Near Celeb <span className="text-strong">Document Page</span>
          </h1>
          <h2 className="mt-12 text-white text-4xl">On Production</h2>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
