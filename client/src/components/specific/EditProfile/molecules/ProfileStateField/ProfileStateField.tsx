import { UseFormRegisterReturn } from "react-hook-form";

interface ProfileStateFieldProps {
  register: UseFormRegisterReturn;
  before: string;
}

export const ProfileStateField: React.FC<ProfileStateFieldProps> = ({
  register,
  before,
}) => {
  return (
    <input
      type="text"
      maxLength={50}
      className="w-2/3 text-lg laptop:text-xl bg-white border-b-1 border-container border-opacity-0 hover:border-opacity-50 focus:border-opacity-50 focus:outline-none transition-colors"
      placeholder={before}
      {...register}
    />
  );
};
