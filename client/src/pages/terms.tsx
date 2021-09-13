import Head from "next/head";

const Terms = () => {
  return (
    <div>
      <Head>
        <title>Terms | Near Celeb</title>
      </Head>
      <div className="laptop:py-18 p-12 laptop:px-32">
        <div className="flex mb-4 laptop:mb-8 tablet:text-2xl laptop:text-3xl desktop:text-4xl text-xl">
          <h1 className="">Terms of</h1>
          <h1 className="text-strong">&nbsp;Near Celeb</h1>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <img src="/tnp/terms.svg" alt="terms" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Terms;
