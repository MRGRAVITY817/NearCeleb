import { Logo } from "../../atoms/Logo/Logo";
import { PageMenu } from "../../molecules/PageMenu/PageMenu";
import { SideBar } from "../../molecules/SideBar/SideBar";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <SideBar>
      <div className="mb-20 w-1/2">
        <Logo />
      </div>
      <PageMenu />
    </SideBar>
  );
};
