import { useRouter } from "next/dist/client/router";
import { Button } from "../../../../common/atoms";
export const Cancel = () => {
  const router = useRouter();
  const onClickCancel = () => {
    const ok = window.confirm("Cancel editting your profile?");
    if (ok) {
      router.push("/dashboard");
    }
  };
  return (
    <Button color="container" onClick={() => onClickCancel()}>
      Cancel
    </Button>
  );
};
