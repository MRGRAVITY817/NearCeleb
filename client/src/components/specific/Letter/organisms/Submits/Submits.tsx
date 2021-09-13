import { SaveToPostbox, SendNow } from "../../molecules";

export const Submits = () => {
  return (
    <div className="grid gap-2 grid-flow-col w-full">
      <SaveToPostbox />
      <SendNow />
    </div>
  );
};
