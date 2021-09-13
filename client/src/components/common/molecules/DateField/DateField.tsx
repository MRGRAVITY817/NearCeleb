import { DateInput, FieldWrapper } from "../../atoms";
import { DateInputProps } from "../../atoms/DateInput/DateInput";

export interface DateFieldProps extends DateInputProps {
  fold?: boolean;
  fieldName: string;
  required?: boolean;
}

export const DateField: React.FC<DateFieldProps> = ({
  fold = false,
  required = false,
  fieldName,
  ...props
}) => {
  return (
    <FieldWrapper fold={fold} fieldName={fieldName} required={required}>
      <DateInput {...props} />
    </FieldWrapper>
  );
};
