import { makeVar, useReactiveVar } from "@apollo/client";

export const isSideBarOpenVar = makeVar<boolean>(false);

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({ ...props }) => {
  const isSideBarOpen = useReactiveVar(isSideBarOpenVar);
  const translateX = isSideBarOpen ? `translate-x-0` : `translate-x-72`;
  const shadow = `shadow-md laptop:shadow-none`;
  return (
    <div
      className={`fixed z-30 flex flex-col items-center 
                  justify-start pt-20 w-48 laptop:w-72 h-full transform
                  text-center text-white bg-container laptop:bg-main  
                  laptop:translate-x-0 laptop:left-0 right-0 transition-all
                  ${translateX} ${shadow}`}
    >
      {props.children}
    </div>
  );
};
