import React from "react";
import { Button } from "../../../../common/atoms/Button/Button";
import { StyleMenu } from "..";
import { HeadingMenu } from "../HeadingMenu/HeadingMenu";
import { EndingMenu } from "../EndingMenu/EndingMenu";
import { FontsMenu } from "../FontsMenu/FontsMenu";
import { useReactiveVar } from "@apollo/client";
import { letterMenuVar } from "../../reactiveVars";

export const ContentMenu = () => {
  const contentMenu = useReactiveVar(letterMenuVar);
  return (
    <div className="h-full">
      <div className="grid gap-2 grid-flow-col">
        <Button
          onClick={() => letterMenuVar("heading")}
          selected={contentMenu === "heading"}
        >
          Heading
        </Button>
        <Button
          onClick={() => letterMenuVar("ending")}
          selected={contentMenu === "ending"}
        >
          Ending
        </Button>
      </div>
      {/* Writing Blocks */}
      <div className="laptop:pt-12 pt-4 h-full">
        {contentMenu === "heading" && <HeadingMenu />}
        {contentMenu === "ending" && <EndingMenu />}
        {contentMenu === "fonts" && <FontsMenu />}
        {contentMenu === "style" && <StyleMenu />}
      </div>
    </div>
  );
};
