import { FieldWrapper } from "../../atoms";
import { ImageInput, ImageInputProps } from "../../atoms/ImageInput/ImageInput";

export interface ImageFieldProps extends ImageInputProps {
  fold?: boolean;
  fieldName: string;
  required?: boolean;
}

export const ImageField: React.FC<ImageFieldProps> = ({
  fold = false,
  required = false,
  fieldName,
  ...props
}) => {
  return (
    <FieldWrapper fieldName={fieldName} required={required} fold={fold}>
      <ImageInput {...props} />
    </FieldWrapper>
  );
};
