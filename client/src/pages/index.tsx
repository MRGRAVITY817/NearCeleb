import {
  Subscribe,
  Intro,
  ThreeLines,
  Business,
  About,
} from "../components/specific/Home/organisms";
import { HomePageTemplate } from "../components/specific/Home/templates";
import { isLoggedInVar } from "../lib/apollo";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();
  isLoggedIn && router.push("/trend");
  return (
    <HomePageTemplate
      intro={<Intro />}
      threeLines={<ThreeLines />}
      business={<Business />}
      about={<About />}
      subscribe={<Subscribe />}
    />
  );
};

export default Index;
