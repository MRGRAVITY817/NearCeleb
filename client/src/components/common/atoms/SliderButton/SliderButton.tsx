import { ButtonHTMLAttributes } from "react";

export interface SliderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export const SliderButton: React.FC<SliderButtonProps> = ({
  direction,
  ...props
}) => {
  const bgGradient = `linear-gradient(${
    direction === "left" ? `to right` : `to left`
  }, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`;
  const bgOpacity = "opacity-0 hover:opacity-100";
  return (
    <button
      {...props}
      style={{ backgroundImage: `${bgGradient}` }}
      className={`z-20 laptop:p-12 p-4 h-full focus:outline-none transition-all ${bgOpacity}`}
    >
      <h1 className="hover:text-rose-300 text-white text-xl transition-all">
        {direction === "left" ? `Previous` : `Next`}
      </h1>
    </button>
  );
};
