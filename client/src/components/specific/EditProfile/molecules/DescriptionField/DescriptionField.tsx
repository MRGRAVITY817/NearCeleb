import { UseFormRegisterReturn } from "react-hook-form";

interface DescriptionFieldProps {
  register: UseFormRegisterReturn;
  before: string;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
  register,
  before,
}) => {
  return (
    <textarea
      rows={2}
      maxLength={150}
      className="text-md w-4/5 laptop:text-lg font-light bg-white border-b-1 border-container border-opacity-0 hover:border-opacity-50 focus:border-opacity-50 focus:outline-none resize-none transition-colors"
      placeholder={before}
      {...register}
    />
  );
};
