import { useReactiveVar } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import {
  letterCelebIdVar,
  letterCelebNameVar,
  letterContentVar,
  letterFontVar,
  letterPaperVar,
  letterPatternVar,
} from "../../reactiveVars";
import * as htmlToImage from "html-to-image";
import { useState } from "react";
import { Button, PopUp } from "../../../../common/atoms";
import { useRouter } from "next/dist/client/router";
import { SaveLetterMutation } from "../../../../../__generated__/SaveLetterMutation";
import { useSaveLetter } from "../../../../../hooks/graphql/letter/useSaveLetter";
import { dataUriToBlob } from "../../../../../lib/common";
import { uploadFile } from "../../../../../lib/fileUtils";
import { PopUpProps } from "../../../../common/atoms/PopUp/PopUp";
import { windowAlert } from "../../../../../lib/windowUtils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface ConfirmSendNowProps extends PopUpProps {}

export const ConfirmSendNow: React.FC<ConfirmSendNowProps> = ({ useOpen }) => {
  const paper = useReactiveVar(letterPaperVar);
  const pattern = useReactiveVar(letterPatternVar);
  const font = useReactiveVar(letterFontVar);
  const celebId = useReactiveVar(letterCelebIdVar);
  const contents = useReactiveVar(letterContentVar);
  const celebName = useReactiveVar(letterCelebNameVar);
  const [screenshot, setScreenshot] = useState<string>("");

  const router = useRouter();
  const onCompleted = ({ writeLetter }: SaveLetterMutation) => {
    if (writeLetter.error || !writeLetter.ok) {
      window.alert(writeLetter.error);
      return;
    }
    const ok = window.confirm("Letter saved.\nHead to dashboard?");
    if (ok) {
      router.push("/postbox");
    }
  };
  const [saveLetterMutation, { loading }] = useSaveLetter(onCompleted);
  const saveToPostbox = async (previewImage: string) => {
    saveLetterMutation({
      variables: {
        input: {
          celebId,
          contents,
          style: {
            paper,
            pattern,
            font,
          },
          previewImage,
        },
      },
    });
  };
  const confirmAndSend = async (screenshot: string) => {
    const ok = window.confirm("Send letter to celeb?");
    if (!ok) return;
    try {
      const screenshotFile = dataUriToBlob(screenshot);
      const { ok, error, url: coverImage } = await uploadFile({
        file: screenshotFile,
        endpoint: "letters/letter-image",
      });
      if (!ok) {
        console.log(error);
        return;
      }
      await saveToPostbox(coverImage!);
      await handleCheckout();
    } catch (error) {
      windowAlert({
        message: error,
      });
    }
  };
  const handleCheckout = async () => {
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId,
    });
  };
  const letterScreenshot = async () => {
    try {
      const dataUri = await htmlToImage.toJpeg(
        document.getElementById("user-letter")!,
        {
          quality: 0.5,
        }
      );
      setScreenshot(dataUri);
    } catch (error) {
      setScreenshot("");
    }
  };
  letterScreenshot();
  return (
    <PopUp useOpen={useOpen}>
      {screenshot.length === 0 ? (
        <h1 className="p-12 laptop:p-24 text-main laptop:text-2xl text-xl">
          Scanning Letter ...
        </h1>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 laptop:p-8 w-auto text-main">
          <h1 className="m-8 laptop:mb-12 text-center text-2xl font-semibold">
            Confirm and send the letter to{" "}
            <span className="text-strong font-semibold">{celebName}?</span>
          </h1>
          <div className="grid gap-6 grid-cols-1 laptop:grid-cols-2">
            <div className="text-md grid gap-3 grid-flow-row laptop:text-lg">
              <p>{contents.receiver}</p>
              <p>{contents.heading}</p>
              <p>{contents.body}</p>
              <p>{contents.ending}</p>
              <p>{contents.sender}</p>
            </div>
            <img
              src={screenshot}
              alt="letterScreenshot"
              className="rounded-md shadow-md"
            />
          </div>
          <div className="laptop:mt-12 mt-4">
            <Button onClick={() => confirmAndSend(screenshot)} color="main">
              Confirm {`&`} Save
            </Button>
          </div>
        </div>
      )}
    </PopUp>
  );
};
