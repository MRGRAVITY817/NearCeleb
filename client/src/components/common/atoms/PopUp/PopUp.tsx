import { UseState } from "../../../../lib/types/hooks";

export interface PopUpProps {
  useOpen: UseState<boolean>;
}

export const PopUp: React.FC<PopUpProps> = ({ useOpen, ...props }) => {
  const [open, setOpen] = useOpen;
  return open ? (
    <div className="absolute inset-0">
      <div
        onClick={() => {
          setOpen(false);
        }}
        className="fixed z-10 inset-0 w-screen h-screen shadow-md"
      />
      <div
        style={{
          left: `50%`,
          top: `50%`,
          transform: `translate(-50%, -50%)`,
        }}
        className="fixed z-30 p-4 bg-white rounded-md shadow-md"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-md px-4 text-white laptop:text-lg font-normal bg-main rounded-full focus:outline-none"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto">{props.children}</div>
      </div>
    </div>
  ) : null;
};
