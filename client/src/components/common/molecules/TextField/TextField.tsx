import { FieldWrapper } from "../../atoms";
import { TextInput, TextInputProps } from "../../atoms/TextInput/TextInput";

export interface TextFieldProps extends TextInputProps {
  fieldName: string;
  fold?: boolean;
  errors?: string[];
}
export const TextField: React.FC<TextFieldProps> = ({
  fieldName,
  required = false,
  fold = false,
  errors = [],
  ...props
}) => {
  return (
    <FieldWrapper
      fieldName={fieldName}
      required={required}
      fold={fold}
      errors={errors}
    >
      <TextInput required={required} {...props} />
    </FieldWrapper>
  );
};
