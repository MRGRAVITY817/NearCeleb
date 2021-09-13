import { ReactNode } from "react";

interface AdminFormProps {
  leftForm: ReactNode;
  rightForm: ReactNode;
  submit: ReactNode;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  leftForm,
  rightForm,
  submit,
}) => {
  return (
    <form className="flex flex-col items-center justify-center p-2 laptop:p-8 border-2 border-gray-600">
      <div className="grid grid-cols-1 laptop:grid-cols-2 w-full">
        {leftForm}
        {rightForm}
      </div>
      {submit}
    </form>
  );
};
