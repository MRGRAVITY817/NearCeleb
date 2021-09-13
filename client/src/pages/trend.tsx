import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { CelebInfo } from "../components/common/organisms";
import { BirthdaySlider } from "../components/specific/Trend/organisms/BirthdaySlider/BirthdaySlider";
import { TrendSlider } from "../components/specific/Trend/organisms/TrendSlider/TrendSlider";
import { TrendTemplate } from "../components/specific/Trend/templates/TrendTemplate/TrendTemplate";
import { isLoggedInVar } from "../lib/apollo";
import { celebsPageInfoId } from "./celebs";

const Trend = () => {
  const celebId = useReactiveVar(celebsPageInfoId);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  return (
    <div>
      <Head>
        <title>Trend | Near Celeb</title>
      </Head>
      <TrendTemplate
        trendSlider={<TrendSlider />}
        birthdaySlider={<BirthdaySlider />}
      />
    </div>
  );
};

export default Trend;
