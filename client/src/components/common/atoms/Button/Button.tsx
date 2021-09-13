import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  color?: "white" | "main" | "container" | "strong";
}

export const Button: React.FC<ButtonProps> = ({
  selected = true,
  color = "white",
  ...props
}) => {
  const selectableStyle =
    typeof selected !== undefined
      ? `${
          selected
            ? `text-main bg-opacity-100 hover:bg-opacity-100`
            : `text-white hover:text-strong bg-opacity-0 hover:bg-opacity-0`
        }`
      : ``;
  const rounded = `rounded-md`;
  const colored = props.disabled
    ? `bg-gray-400 text-white border-gray-400`
    : `border-${color} bg-${color} 
       focus:bg-${color} focus:border-${color} 
       text-${color === "white" ? `main` : `white`}`;
  return (
    <>
      <button
        className={`flex items-center justify-center text-md
                    p-1 tablet:py-2 tablet:px-2 cursor-pointer
                    border-2 hover:border-strong hover:bg-strong
                    focus:outline-none transition-all laptop:text-lg  
                    ${selectableStyle} ${rounded} ${colored}
                    ${props.disabled ? `pointer-events-none` : ``}`}
        {...props}
      >
        {props.children}
      </button>
    </>
  );
};
