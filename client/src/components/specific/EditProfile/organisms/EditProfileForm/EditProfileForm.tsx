import { useForm } from "react-hook-form";
import { ImageField } from "../../../../common/molecules";

interface EditProfileFormField {
  profileImage: string;
  coverImage: string;
  description: string;
  signature: string;
  userName: string;
  letterName: string;
  birthDate: Date;
}

export const EditProfileForm = () => {
  const { control, getValues } = useForm<EditProfileFormField>({
    mode: "onBlur",
  });
  return (
    <div className="grid gap-0 laptop:gap-12 grid-cols-1 laptop:grid-cols-2 laptop:pb-12 pb-4 laptop:px-12 px-4">
      <div className="grid gap-2 grid-flow-row">
        <ImageField
          control={control}
          name="profileImage"
          fieldName="Profile Image"
        />
      </div>
      <div className="grid gap-2 grid-flow-row"></div>
    </div>
  );
};
