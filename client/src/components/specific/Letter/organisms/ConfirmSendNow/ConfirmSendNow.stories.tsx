import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { ConfirmSendNow } from "./ConfirmSendNow";

storiesOf("Confirm 'Send now'", module).add("Default", () => {
  const useOpen = useState<boolean>(false);
  return <ConfirmSendNow useOpen={useOpen} />;
});
