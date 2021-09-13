import { Button } from "../../../../common/atoms/Button/Button";
import { ConfirmSendNow } from "../../organisms";
import { ReactiveVar, useReactiveVar } from "@apollo/client";
import {
  letterCelebIdVar,
  letterOutlineVar,
  letterSubmitVar,
} from "../../reactiveVars";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { windowAlert } from "../../../../../lib/windowUtils";

export const SendNow = () => {
  const celebId = useReactiveVar(letterCelebIdVar);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const openConfirmWindow = (submit: ReactiveVar<boolean>) => {
    if (celebId === -1) {
      windowAlert({
        message:
          "Haven't picked celeb to send a letter?\nGo check out celeb page!",
        alertCallback: () => router.push("/celebs"),
      });
      return;
    }
    submit(true);
    setOpen(true);
  };
  useEffect(() => {
    open ? letterSubmitVar(true) : letterSubmitVar(false);
  }, [open]);
  return (
    <>
      <Button role="link" onClick={() => openConfirmWindow(letterSubmitVar)}>
        Send now
      </Button>
      {open && <ConfirmSendNow useOpen={[open, setOpen]} />}
    </>
  );
};
