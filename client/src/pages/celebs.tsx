import { makeVar } from "@apollo/client";
import { NextPage } from "next";
import { SearchCeleb } from "../components/common/organisms/SearchCeleb/SearchCeleb";
import { CelebsPageTemplate } from "../components/specific/Celebs/templates/CelebsPageTemplate/CelebsPageTemplate";

export const celebsPageInfoId = makeVar<number>(-1);

const CelebsPage: NextPage = () => {
  return <CelebsPageTemplate searchCeleb={<SearchCeleb />} />;
};

export default CelebsPage;
