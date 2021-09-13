import { OneLine } from "../../molecules";

export const ThreeLines = () => {
  return (
    <div className="grid gap-2 laptop:gap-4 grid-flow-row">
      <OneLine content="You can send a letter to your favorite K-Celeb, from individuals to big companies, with an affordable price." />
      <OneLine content="Follow the celeb you like and check out their various events." />
      <OneLine content="Considering how to write a fan letter? Try in 'LETTER' page!" />
    </div>
  );
};
