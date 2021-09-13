import { FieldWrapper } from "../../atoms";
import {
  SelectOption,
  SelectOptionProps,
} from "../../atoms/SelectOption/SelectOption";

export interface OptionFieldProps extends SelectOptionProps {
  fold?: boolean;
  fieldName: string;
}
export const OptionField: React.FC<OptionFieldProps> = ({
  fold = false,
  required = false,
  fieldName,
  ...props
}) => {
  return (
    <FieldWrapper fieldName={fieldName} required={required} fold={fold}>
      <SelectOption {...props} />
    </FieldWrapper>
  );
};
