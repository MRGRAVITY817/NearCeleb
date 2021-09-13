import { ButtonHTMLAttributes } from "react";
import { RiRefreshLine } from "react-icons/ri";

export const Refresh: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button className="focus:outline-none" {...props}>
      <RiRefreshLine className="text-xl" />
    </button>
  );
};
