import { AiFillGoogleCircle } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/client";
import { Button } from "../../atoms/Button/Button";
import { useRouter } from "next/dist/client/router";
import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { windowAlert, windowConfirm } from "../../../../lib/windowUtils";
import { useLoginMutation } from "../../../../hooks/graphql/auth/useLoginMutation";
import { logUserIn } from "../../../../lib/apollo";
import { Login } from "../../../../__generated__/Login";

export const socialEmailVar = makeVar<string>("");
export const SocialSign = () => {
  // Check Social Login
  const socialEmail = useReactiveVar(socialEmailVar);
  const router = useRouter();
  const [session, loading] = useSession();
  const onCompleted = (data: Login) => {
    const { ok, error, token } = data.login;
    if (!ok || error) {
      if (error?.startsWith("Could not find user")) {
        windowConfirm({
          message: "Seems like you aren't yet our user.\nCreate account?",
          noMessage: "No, not yet.",
          noCallback: () => signOut(),
          yesMessage: "Yes, create account",
          yesCallback: () => {
            socialEmailVar(socialEmail);
            router.push("/sign-up");
          },
        });
      } else {
        windowAlert({
          message: error + "",
        });
      }
      return;
    }
    logUserIn({ ok, error, token });
    router.push("/trend");
  };
  const [loginMutation] = useLoginMutation(onCompleted);
  const socialLogin = async (providers: string) => {
    try {
      await signIn(providers);
    } catch (error) {
      windowAlert({
        message: error,
      });
    }
  };
  useEffect(() => {
    if (!loading && session?.user.email) {
      socialEmailVar(session.user.email);
      loginMutation({
        variables: {
          input: {
            email: session.user.email,
          },
        },
      });
    }
  }, [loading, session]);
  return (
    <div className="laptop:max-w-screen-lg laptop:mt-0 mt-12 laptop:p-10 p-5 max-w-xl text-container bg-white rounded-md">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-8 tablet:text-2xl text-xl font-semibold">
          Start your <span className="text-strong">journey </span>with
        </h1>
        <div className="grid gap-2 grid-flow-row w-full text-center text-white font-medium">
          <Button color="main" onClick={() => socialLogin("google")}>
            <p className="mr-2 laptop:text-lg text-sm">Google</p>
            <AiFillGoogleCircle className="text-lg" />
          </Button>
        </div>
      </div>
    </div>
  );
};
