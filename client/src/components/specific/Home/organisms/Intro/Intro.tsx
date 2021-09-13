import { makeVar, useReactiveVar } from "@apollo/client";
import { SignUp, SignIn } from "..";
import { Container } from "../../../../common/atoms";
import { SocialSign } from "../../../../common/molecules";

const introImage =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

export const isSignInVar = makeVar(true);
export const Intro = () => {
  const isSignIn = useReactiveVar(isSignInVar);
  return (
    <Container bgCover={introImage} bgDirection="center" gradient>
      <div className="flex flex-col laptop:flex-row items-center justify-around laptop:px-12 px-8 py-12 laptop:py-20">
        <div className="flex flex-col justify-center laptop:w-1/2 w-full text-white">
          <h1 className="text-center laptop:text-left text-4xl tablet:text-6xl font-bold laptop:font-bold">
            Send your love to celebs with cloud letters.
          </h1>
          <h2 className="mt-4 tablet:mt-8 text-center laptop:text-left text-2xl tablet:text-3xl">
            All we need is your words.
          </h2>
          <h2 className="tablet:mt-8 my-4 text-center laptop:text-left tablet:text-4xl text-xl font-semibold">
            Your star is nearer than you think, <br />
            with <span className="text-strong">Near Celeb</span> .
          </h2>
        </div>
        <SocialSign />
      </div>
    </Container>
  );
};
