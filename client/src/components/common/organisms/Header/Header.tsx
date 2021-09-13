import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useMe } from "../../../../hooks/graphql/auth/useMe";
import { isLoggedInVar } from "../../../../lib/apollo";
import { isSideBarOpenVar } from "../../molecules/SideBar/SideBar";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isSideBarOpen = useReactiveVar(isSideBarOpenVar);
  const profileImage = (isLoggedIn: boolean) =>
    isLoggedIn && data?.me.userInfo?.profileImage
      ? data?.me.userInfo?.profileImage!
      : "/noImage/maleNoImage.svg";

  const router = useRouter();
  const { data, loading } = useMe();
  return (
    <div className="fixed z-20 right-0 top-0 flex items-center justify-between laptop:px-12 px-4 w-full h-20 laptop:h-24 bg-main">
      <button
        onClick={() => isSideBarOpenVar(!isSideBarOpen)}
        className="grid gap-2 grid-flow-row w-8 focus:outline-none"
      >
        <h1 className="border-b-2 border-strong" />
        <h1 className="border-b-2 border-strong" />
        <h1 className="border-b-2 border-strong" />
      </button>
      <div
        onClick={() => isSideBarOpenVar(false)}
        className="mx-4 w-full h-full"
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <img
          onClick={() => {
            isLoggedIn && router.push("/dashboard");
          }}
          src={profileImage(isLoggedIn)}
          onError={(event) => {
            event.currentTarget.src = `/noImage/maleNoImage.svg`;
          }}
          alt=""
          className="w-10 laptop:w-12 h-10 laptop:h-12 bg-main rounded-full focus:outline-none cursor-pointer object-cover"
        />
      )}
    </div>
  );
};
