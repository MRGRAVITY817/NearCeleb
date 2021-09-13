import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { ConfirmSaveToPostbox } from "./ConfirmSaveToPostbox";

storiesOf("Confirm 'Save to postbox'", module).add("Default", () => {
  const useOpen = useState<boolean>(false);
  return <ConfirmSaveToPostbox useOpen={useOpen} />;
});
