import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import {
  isWindowOpenVar,
  windowInfoVar,
} from "../components/common/molecules/Window/Window";
import {
  ContentMenu,
  LetterPaper,
  SubMenu,
  Submits,
} from "../components/specific/Letter/organisms";
import { letterCelebNameVar } from "../components/specific/Letter/reactiveVars";
import { LetterPageTemplate } from "../components/specific/Letter/templates";
import { useMe } from "../hooks/graphql/auth/useMe";
import { isLoggedInVar } from "../lib/apollo";

export const maxLineLength = 36;

interface LetterContentsForm {
  name: string;
  row: number;
  max: number;
}
export const LetterContents: LetterContentsForm[] = [
  { name: "receiver", row: 1, max: maxLineLength },
  { name: "heading", row: 3, max: 3 * maxLineLength },
  { name: "body", row: 8, max: 8 * maxLineLength },
  { name: "ending", row: 2, max: 2 * maxLineLength },
  { name: "sender", row: 1, max: maxLineLength },
];

const Letter = () => {
  const receiver = useReactiveVar(letterCelebNameVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const sender = useMe().data?.me.userName;
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      windowInfoVar({
        type: "alert",
        message: "Log in to enjoy the service.",
        alertCallback: () => {
          router.push("/");
        },
      });
      isWindowOpenVar(true);
    }
  }, [receiver]);
  return (
    <LetterPageTemplate
      contentMenu={<ContentMenu />}
      subMenu={<SubMenu />}
      letterPaper={<LetterPaper receiver={receiver} sender={sender || "Fan"} />}
      submits={<Submits />}
    />
  );
};

export default Letter;
