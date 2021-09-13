import { useReactiveVar } from "@apollo/client";
import { Button } from "../../../../common/atoms";
import {
  letterMenuVar,
  letterOutlineVar,
  letterSignatureVar,
} from "../../reactiveVars";

export const SubMenu = () => {
  const subMenu = useReactiveVar(letterMenuVar);
  const outline = useReactiveVar(letterOutlineVar);
  const signature = useReactiveVar(letterSignatureVar);
  return (
    <div className="grid gap-2 grid-flow-col w-full">
      <Button onClick={() => letterOutlineVar(!outline)} selected={outline}>
        Outline
      </Button>
      <Button
        onClick={() => letterSignatureVar(!signature)}
        selected={signature}
      >
        Signature
      </Button>
      <Button
        onClick={() => letterMenuVar("fonts")}
        selected={subMenu === "fonts"}
      >
        Fonts
      </Button>
      <Button
        onClick={() => letterMenuVar("style")}
        selected={subMenu === "style"}
      >
        Style
      </Button>
    </div>
  );
};
