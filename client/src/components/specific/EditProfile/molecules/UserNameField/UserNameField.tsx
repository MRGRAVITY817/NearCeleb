import { UseFormRegisterReturn } from "react-hook-form";

interface UserNameFieldProps {
  register: UseFormRegisterReturn;
  before: string;
}

export const UserNameField: React.FC<UserNameFieldProps> = ({
  register,
  before,
}) => {
  return (
    <input
      type="text"
      maxLength={20}
      className="laptop:text-3xl text-xl font-bold bg-white border-b-1 border-container border-opacity-0 hover:border-opacity-50 focus:border-opacity-50 focus:outline-none transition-colors"
      placeholder={before}
      {...register}
    />
  );
};
