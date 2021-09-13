import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
}

export const TextInput: React.FC<TextInputProps> = ({ register, ...props }) => {
  return (
    <>
      <input
        className={`p-2 w-full text-main border-main border-1 rounded-md text-sm focus:outline-none transition-all`}
        {...props}
        {...register}
      />
    </>
  );
};
