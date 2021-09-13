import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Control, Controller } from "react-hook-form";

export interface DateInputProps {
  control: Control<any>;
  name: string;
}

export const DateInput: React.FC<DateInputProps> = ({ control, name }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => {
            onChange(date);
            setStartDate(date as Date);
          }}
          className="p-2 text-container rounded-md"
        />
      )}
    />
  );
};
