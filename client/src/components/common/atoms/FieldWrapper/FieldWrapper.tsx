import { useState } from "react";
import { CheckBox } from "../../atoms";

interface FieldWrapperProps {
  fieldName: string;
  required: boolean;
  errors?: string[];
  fold?: boolean;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  fieldName,
  errors = [],
  required,
  fold = true,
  ...props
}) => {
  const [hide, setHide] = useState<boolean>(fold);
  return (
    <div className="my-2 w-full">
      <div className="flex items-center justify-between">
        <label className="my-2">
          {fieldName}{" "}
          <span className="ml-2 text-strong">{required ? "*" : ""}</span>
        </label>
        {!required && (
          <CheckBox
            stateHandler={[hide, setHide]}
            name={`${hide ? `Show` : `Hide`}`}
          />
        )}
      </div>
      {(!hide || required) && (
        <div>
          {props.children}
          {errors.map((error) => (
            <h1 className="text-strong">{error}</h1>
          ))}
        </div>
      )}
    </div>
  );
};
