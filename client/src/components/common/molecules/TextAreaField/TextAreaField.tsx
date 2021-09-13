import { FieldWrapper } from "../../atoms";
import { TextArea, TextAreaProps } from "../../atoms/TextArea/TextArea";

export interface TextAreaFieldProps extends TextAreaProps {
  fold?: boolean;
  max?: number;
  fieldName: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  required = false,
  fold = false,
  max = 500,
  fieldName,
  ...props
}) => {
  return (
    <FieldWrapper fieldName={fieldName} required={required} fold={fold}>
      <TextArea required={required} maxLength={max} {...props} />
    </FieldWrapper>
  );
};
