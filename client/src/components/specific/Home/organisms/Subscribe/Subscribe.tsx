import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../../../../lib/constants";
interface ISubsEmailForm {
  email: string;
}

export const Subscribe = () => {
  const {
    register,
    getValues,
    formState,
    handleSubmit,
  } = useForm<ISubsEmailForm>({ mode: "onChange" });
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const onSubscribe = () => {
    const ok = window.confirm("Ready to get news from NearCeleb.com?");
    if (ok) {
      setSubscribed(true);
    }
  };
  const bgGradient =
    "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))";
  return (
    <div
      style={{
        backgroundImage: `${bgGradient}, url(https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
      }}
      className="flex flex-col laptop:flex-row items-center justify-center px-8 py-12 laptop:py-32 w-full text-white bg-cover bg-center rounded-xl"
    >
      <div className="laptop:py-10 laptop:w-1/3 leading-loose">
        <h1 className="text-center text-2xl laptop:text-4xl font-medium">
          Want to keep up trending news about K-celebs?
        </h1>
        <h1 className="laptop:mt-16 mt-4 text-center laptop:text-3xl text-xl font-light laptop:font-normal">
          Join the NearCeleb newsletter and stay updated on weekly news about
          K-pop artists, actors, and other celebs you love.
        </h1>
      </div>
      <div className="mt-8 laptop:px-10 laptop:w-1/2 w-full">
        <form
          className="flex flex-col items-center laptop:ml-12"
          onSubmit={handleSubmit(onSubscribe)}
        >
          <input
            type="email"
            placeholder="username@email.com"
            required
            {...register("email", {
              required: "Email is required",
              pattern: EMAIL_REGEX,
            })}
            className="px-2 laptop:px-3 py-1 laptop:py-4 laptop:w-3/4 w-full text-container text-lg border-1 laptop:border-2 focus:border-main rounded-lg focus:outline-none transition-all"
          />
          <button className="laptop:mt-10 mt-3 px-2 laptop:px-3 py-1 laptop:py-4 laptop:w-3/4 w-full laptop:text-2xl text-xl bg-strong rounded-lg shadow-md transition-all">
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
};
