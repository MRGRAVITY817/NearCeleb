import Head from "next/head";
import { ReactChild } from "react";

interface PricingPageTemplateProps {
  pricingTable: ReactChild;
}
export const PricingPageTemplate: React.FC<PricingPageTemplateProps> = ({
  pricingTable,
}) => {
  return (
    <div>
      <Head>
        <title>Pricing | Near Celeb</title>
      </Head>
      <div className="tablet:pb-12 laptop:pb-20 desktop:pb-24 pb-4 tablet:px-12 laptop:px-20 desktop:px-24 px-4">
        {pricingTable}
      </div>
    </div>
  );
};
