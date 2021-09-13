import { UseState } from "../../../../lib/types/hooks";

interface CheckBoxProps {
  name?: string;
  stateHandler: UseState<boolean>;
  init?: boolean;
}
export const CheckBox: React.FC<CheckBoxProps> = ({ name, stateHandler }) => {
  const [on, setOn] = stateHandler;
  return (
    <div className="flex">
      <h1 className="mx-4">{name ? name : ``}</h1>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-6 h-6 border-2 focus:outline-none border-white bg-white 
        transition-all rounded-full ${on ? `bg-opacity-100` : `bg-opacity-0`}`}
      ></button>
    </div>
  );
};
