import { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface SignatureFieldProps {
  control: Control<any>;
  name: string;
  before: string;
}

export const SignatureField: React.FC<SignatureFieldProps> = ({
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
        <div className="flex flex-col items-center w-full">
          <img
            src={displayImg}
            alt=""
            className="w-full h-32 laptop:h-48 object-contain object-center"
          />
          <label
            className={`flex w-1/2 items-center justify-center mt-4 py-2 px-4 text-white bottom-4 right-4 h-12 bg-container rounded-md cursor-pointer transition-all hover:bg-strong`}
          >
            <span className="">Add/Edit Signature</span>
            <input
              className="hidden"
              id="editSignature"
              type="file"
              accept="image/png"
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
