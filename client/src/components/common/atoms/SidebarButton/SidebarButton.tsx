import { ButtonHTMLAttributes } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { UseState } from "../../../../lib/types/hooks";

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stateHandler: UseState<boolean>;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  stateHandler,
}) => {
  const [open, setOpen] = stateHandler;
  const bgTextColor = open ? `text-main bg-white` : `text-main bg-strong`;
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`fixed z-40 m-3 p-2 ${bgTextColor} rounded-full right-0
                    shadow-md cursor-pointer transform -translate-y-0 
                    laptop:-translate-y-14 transition-all`}
    >
      <AiOutlineMenu className="text-2xl" />
    </div>
  );
};
