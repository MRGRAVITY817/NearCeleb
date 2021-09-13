import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { CelebInfo } from "./CelebInfo";

storiesOf("Celeb Info", module).add("Default", () => {
  const useOpen = useState<boolean>(false);
  return <CelebInfo celebId={100} useOpen={useOpen} />;
});
