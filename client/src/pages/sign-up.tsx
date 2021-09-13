import Head from "next/head";
import { useCreateAccount } from "../hooks/graphql/auth/useCreateAccount";
import { CreateAccountMutation } from "../__generated__/CreateAccountMutation";
import { Button } from "../components/common/atoms";
import { useForm } from "react-hook-form";
import { TextField } from "../components/common/molecules";
import { useReactiveVar } from "@apollo/client";
import { socialEmailVar } from "../components/common/molecules/SocialSign/SocialSign";
import { useRouter } from "next/dist/client/router";
import { EMAIL_REGEX } from "../lib/constants";
import { windowAlert, windowConfirm } from "../lib/windowUtils";

interface SignUpForm {
  email: string;
  userName: string;
}

const SignUp = () => {
  const socialEmail = useReactiveVar(socialEmailVar);
  const { getValues, handleSubmit, register, formState } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues: {
      email: socialEmail,
    },
  });
  const router = useRouter();
  const onCompleted = (data: CreateAccountMutation) => {
    const { ok, error } = data.createUser;
    if (!ok) {
      if (error?.startsWith("Email already")) {
        socialEmailVar("");
        windowConfirm({
          message: "Seems like you're already our user.\nLog in?",
          noMessage: "No, stay here.",
          noCallback: () => {
            router.reload();
          },
          yesMessage: "Yes, head to main page.",
          yesCallback: () => {
            router.push("/");
          },
        });
      } else {
        windowAlert({
          message:
            "Cannot create account due to our server error.\nTry again later.",
        });
      }
    }
    socialEmailVar("");
    windowAlert({ message: "Created Account.\nWelcome, friend!" });
    router.push("/trend");
  };
  const [createAccountMutation] = useCreateAccount(onCompleted);
  const createAccount = () => {
    const { email, userName } = getValues();
    windowConfirm({
      message: "Create Account?",
      noMessage: "No, not yet.",
      yesMessage: "Yes!",
      yesCallback: () =>
        createAccountMutation({
          variables: {
            input: {
              email,
              userName,
            },
          },
        }),
    });
  };
  return (
    <div>
      <Head>
        <title>Sign Up | Near Celeb</title>
      </Head>
      <div className="flex flex-col items-center justify-center mt-20 laptop:mt-36">
        <h1 className="text-center text-2xl laptop:text-4xl">
          Welcome to
          <span>
            <img
              src="/NearCelebLetter.svg"
              alt="logo"
              className="mt-4 laptop:mt-8 h-12 laptop:h-20"
            />
          </span>
        </h1>
        <form
          onSubmit={handleSubmit(createAccount)}
          className="flex flex-col justify-center laptop:mt-12 mt-8 w-1/2"
        >
          <div className="grid gap-2 grid-flow-row laptop:mb-12 mb-8">
            <TextField
              register={register("email", {
                required: "Email is required",
                pattern: EMAIL_REGEX,
              })}
              fieldName="Email"
              required
            />
            {formState.errors.email?.message && (
              <h1 className="text-strong">{formState.errors.email.message}</h1>
            )}
            {formState.errors.email?.types?.pattern && (
              <h1 className="text-strong">
                {formState.errors.email.types.pattern}
              </h1>
            )}
            <TextField
              register={register("userName", {
                required: "Username is required",
                maxLength: 20,
              })}
              fieldName="Username"
              required
            />
            {formState.errors.userName?.message && (
              <h1 className="text-strong">
                {formState.errors.userName.message}
              </h1>
            )}
          </div>
          <Button color="container" type="submit" disabled={!formState.isValid}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
