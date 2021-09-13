import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectOptionProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  register: UseFormRegisterReturn;
}

export const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  register,
  ...props
}) => {
  return (
    <select
      style={{ WebkitAppearance: `none` }}
      className="my-1 p-2 w-full text-main bg-white rounded-md focus:outline-none"
      {...props}
      {...register}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
