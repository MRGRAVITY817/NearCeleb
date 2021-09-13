import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Control, Controller } from "react-hook-form";
import { RiCake2Fill } from "react-icons/ri";

export interface BirthDateFieldProps {
  control: Control<any>;
  name: string;
  before: Date;
}

export const BirthDateField: React.FC<BirthDateFieldProps> = ({
  control,
  name,
  before,
}) => {
  const [startDate, setStartDate] = useState<Date>(before);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div>
          <div className="my-4">
            <RiCake2Fill className="laptop:text-2xl text-xl" />
          </div>
          <ReactDatePicker
            dateFormat="MM.dd.yyyy"
            selected={startDate}
            onChange={(date) => {
              onChange(date);
              setStartDate(date as Date);
            }}
            className="text-container focus:underline text-lg laptop:text-xl bg-white rounded-md focus:outline-none cursor-pointer transition-all"
          />
        </div>
      )}
    />
  );
};
