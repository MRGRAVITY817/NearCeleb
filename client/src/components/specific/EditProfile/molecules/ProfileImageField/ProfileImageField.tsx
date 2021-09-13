import { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface ProfileImageFieldProps {
  control: Control<any>;
  name: string;
  before: string;
}

export const ProfileImageField: React.FC<ProfileImageFieldProps> = ({
  control,
  name,
  before,
}) => {
  const [displayImg, setDisplayImg] = useState<string>(before);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div
          style={{
            backgroundImage: `url(${displayImg})`,
          }}
          className="absolute left-12 laptop:left-28 top-16 laptop:top-40 flex items-end justify-center p-2 w-28 laptop:w-40 h-28 laptop:h-40 bg-container bg-cover bg-center rounded-full shadow-md"
        >
          <label
            className={`flex items-center justify-center text-white h-8 w-8 bg-container rounded-full cursor-pointer transition-all hover:bg-strong`}
          >
            <span>+</span>
            <input
              className="hidden"
              id="editProfileImage"
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  onChange(event.currentTarget.files[0]);
                  setDisplayImg(
                    URL.createObjectURL(event.currentTarget.files[0])
                  );
                }
              }}
            />
          </label>
        </div>
      )}
    />
  );
};
