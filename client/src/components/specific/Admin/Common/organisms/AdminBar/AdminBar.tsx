import { Dispatch, SetStateAction } from "react";
import { Logo } from "../../../../../common/atoms/Logo/Logo";
import { SideBar } from "../../../../../common/molecules/SideBar/SideBar";
import { AdminBarMenu } from "../../molecules/AdminBarMenu/AdminBarMenu";

const methodMenu = ["add", "edit", "delete"];
const categories = ["celeb", "trend"];

interface AdminBarProps {}

export const AdminBar: React.FC<AdminBarProps> = ({}) => {
  return (
    <SideBar>
      <div className="mb-20 w-1/5">
        <Logo />
      </div>
      {categories.map((category) => (
        <>
          <AdminBarMenu category={category} menu={methodMenu} />
          <div className="flex justify-center my-10 w-2/3">
            <div className="w-full text-center border-t-1 border-rose-300"></div>
          </div>
        </>
      ))}
    </SideBar>
  );
};
