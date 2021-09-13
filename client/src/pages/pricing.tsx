import { PricingTable } from "../components/specific/Pricing/organisms";
import { PricingPageTemplate } from "../components/specific/Pricing/templates";

const Pricing = () => {
  return <PricingPageTemplate pricingTable={<PricingTable />} />;
};

export default Pricing;
