import { useState } from "react";
import { BsCloudUpload, BsTrash2Fill } from "react-icons/bs";
import { Control, Controller } from "react-hook-form";

export interface ImageInputProps {
  control: Control<any>;
  mode?: "portrait" | "landscape" | "normal";
  name: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  name,
  control,
  mode = "normal",
}) => {
  const [displayImg, setDisplayImg] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const borderRadius = mode === "portrait" ? `rounded-full` : `rounded-none`;
  const objectSizing = mode === "normal" ? `object-contain` : `object-cover`;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div key={key} className="flex flex-col items-center my-2 w-full">
          <img
            src={displayImg || "/noImage/maleNoImage.svg"}
            alt=""
            onError={(e) => (e.currentTarget.src = "/noImage/maleNoImage.svg")}
            className={`w-40vw h-40vw laptop:w-20vw laptop:h-20vw ${borderRadius} ${objectSizing}`}
          />
          <div className="text-md flex items-center justify-between mb-2 mt-4 w-full h-10">
            <label
              className={`flex items-center w-3/4 justify-center p-2 text-main h-full bg-white rounded-md cursor-pointer transition-all`}
            >
              <span className="">Select an image</span>
              <BsCloudUpload className="ml-4" />
              <input
                className="hidden"
                id="ImageInput"
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
            <button
              onClick={() => {
                onChange(null);
                setDisplayImg("/noImage/maleNoImage.svg");
              }}
              className="flex items-center justify-center ml-2 p-2 w-1/4 h-full text-white bg-strong rounded-md focus:outline-none"
            >
              <BsTrash2Fill className="w-full text-center" />
            </button>
          </div>
        </div>
      )}
    />
  );
};
