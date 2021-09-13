import { FieldWrapper } from "../../atoms";
import { CheckInput, CheckInputProps } from "../../atoms/CheckInput/CheckInput";

export interface CheckFieldProps extends CheckInputProps {
  fieldName: string;
  required?: boolean;
  fold?: boolean;
}

export const CheckField: React.FC<CheckFieldProps> = ({
  fieldName,
  required = false,
  fold = false,
  ...props
}) => {
  return (
    <FieldWrapper fieldName={fieldName} required={required} fold={fold}>
      <CheckInput {...props} />
    </FieldWrapper>
  );
};
