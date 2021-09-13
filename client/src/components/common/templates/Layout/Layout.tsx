import { useReactiveVar } from "@apollo/client";
import { ReactNode } from "react";
import { Window } from "../../molecules";
import { isSideBarOpenVar } from "../../molecules/SideBar/SideBar";
import { isWindowOpenVar } from "../../molecules/Window/Window";
import { Header } from "../../organisms/Header/Header";
import { NavBar } from "../../organisms/NavBar/NavBar";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const isWindowOpen = useReactiveVar(isWindowOpenVar);
  return (
    <div className="flex min-h-screen text-white font-oswald bg-main transition-all">
      <NavBar />
      {isWindowOpen && <Window />}
      <div className="flex flex-col ml-0 laptop:ml-72 mt-20 laptop:mt-24 w-full transition-all">
        <Header />
        <div onClick={() => isSideBarOpenVar(false)}>{children}</div>
      </div>
    </div>
  );
};
