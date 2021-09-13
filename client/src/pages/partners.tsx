import {
  PartnerBody,
  PartnerHeader,
} from "../components/specific/Partner/organisms";
import { PartnerPageTemplate } from "../components/specific/Partner/templates";

const Partners = () => {
  return (
    <PartnerPageTemplate header={<PartnerHeader />} body={<PartnerBody />} />
  );
};

export default Partners;
