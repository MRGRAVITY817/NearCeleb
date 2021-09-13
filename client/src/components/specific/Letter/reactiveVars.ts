import { makeVar, ReactiveVar } from "@apollo/client";

export const letterCelebIdVar = makeVar<number>(-1);
export const letterCelebNameVar = makeVar<string>("");
export const letterOutlineVar = makeVar<boolean>(true);
export const letterSignatureVar = makeVar<boolean>(false);
export const letterPaperVar = makeVar<"basic" | "postcard">("basic");
export const letterPatternVar = makeVar("NormalPaper");
export const letterFontVar = makeVar("font-charmonman");
export const letterSubmitVar = makeVar<boolean>(false);
export const letterMenuVar = makeVar<"heading" | "ending" | "fonts" | "style">(
  "heading"
);
export const letterHeadingVar = makeVar<string>("");
export const letterEndingVar = makeVar<string>("");

export interface LetterForm {
  receiver: string;
  heading: string;
  body: string;
  ending: string;
  sender: string;
}
export const letterContentVar: ReactiveVar<LetterForm> = makeVar({
  receiver: "",
  heading: "",
  body: "",
  ending: "",
  sender: "",
});
