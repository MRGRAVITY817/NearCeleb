import { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface CoverImageFieldProps {
  control: Control<any>;
  name: string;
  before: string;
}

export const CoverImageField: React.FC<CoverImageFieldProps> = ({
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
        <div className="relative w-full">
          <img
            src={displayImg}
            alt=""
            className="w-full h-32 laptop:h-60 laptop:rounded-t-md rounded-t-sm object-cover object-center"
          />
          <label
            className={`flex items-center justify-center py-2 px-4 text-white absolute bottom-4 right-4 h-12 bg-container rounded-md cursor-pointer transition-all hover:bg-strong`}
          >
            <span className="">Add/Edit Cover Image</span>
            <input
              className="hidden"
              id="editCoverImage"
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
