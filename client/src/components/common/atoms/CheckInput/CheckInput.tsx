import { useState } from "react";
import { Controller, Control } from "react-hook-form";

export interface CheckInputProps {
  name: string;
  textColor?: "main" | "white" | "container";
  checkList: string[];
  control: Control<any>;
}

export const CheckInput: React.FC<CheckInputProps> = ({
  checkList,
  textColor = "white",
  name,
  control,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const addOrDelete = async (item: string) => {
    if (selected.includes(item)) {
      const result = selected.filter((remainder) => remainder !== item);
      setSelected(result);
      return result;
    }
    const result = [item, ...selected];
    setSelected(result);
    return result;
  };
  const text = `text-${textColor}`;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="grid gap-4 grid-cols-4">
          {checkList.map((item, index) => (
            <button
              key={index}
              onClick={async () => {
                const result = await addOrDelete(item);
                onChange(result);
              }}
              className={`laptop:text-lg text-md ${
                selected.includes(item) ? `text-strong` : `${text}`
              } hover:text-strong transition-colors`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    />
  );
};
