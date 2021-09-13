import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { isLoggedInVar } from "../../../../lib/apollo";
import { isSideBarOpenVar } from "../../molecules/SideBar/SideBar";

export const Logo = () => {
  const router = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <img
      src="/NearCelebLetter.svg"
      alt="Home"
      className="w-full cursor-pointer"
      onClick={() => {
        isLoggedIn ? router.push("/trend") : router.push("/");
        isSideBarOpenVar(false);
      }}
    />
  );
};
