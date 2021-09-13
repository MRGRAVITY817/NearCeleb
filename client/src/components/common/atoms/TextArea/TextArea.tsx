import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegisterReturn;
}

export const TextArea: React.FC<TextAreaProps> = ({ register, ...props }) => {
  return (
    <textarea
      className={`w-full resize-none text-sm laptop:text-md text-main
                  focus:outline-none transition-all p-2 rounded-md`}
      {...props}
      {...register}
    />
  );
};
