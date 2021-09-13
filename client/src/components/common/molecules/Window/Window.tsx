import { makeVar, useReactiveVar } from "@apollo/client";

export interface WindowInfoParams {
  type?: "alert" | "confirm";
  message: string;
  yesMessage?: string;
  noMessage?: string;
  alertCallback?: () => void;
  yesCallback?: () => void;
  noCallback?: () => void;
}

export const isWindowOpenVar = makeVar<boolean>(false);

export const windowInfoVar = makeVar<WindowInfoParams>({
  type: "alert",
  message: "",
  yesMessage: "",
  noMessage: "",
  alertCallback: () => {},
  yesCallback: () => {},
  noCallback: () => {},
});

export const Window = () => {
  const {
    type,
    message,
    yesMessage,
    noMessage,
    alertCallback,
    noCallback,
    yesCallback,
  } = useReactiveVar(windowInfoVar);
  return (
    <div className="absolute inset-0">
      <div className="fixed z-40 w-screen h-screen bg-container bg-opacity-30" />
      <div
        style={{
          left: `50%`,
          top: `50%`,
          transform: `translate(-50%, -50%)`,
        }}
        className={`bg-container rounded-md
                    text-center py-8 px-4 w-2/3 tablet:w-1/2 laptop:w-1/3 laptop:px-12 laptop:py-12 fixed z-50 shadow-lg`}
      >
        <div className="mb-4 text-white laptop:text-2xl text-xl">
          {message.split("\n").map((m, index) => (
            <h1 key={index}>{m}</h1>
          ))}
        </div>
        {type === "alert" ? (
          <button
            onClick={() => {
              if (typeof alertCallback !== "undefined") {
                alertCallback();
              }
              isWindowOpenVar(false);
            }}
            className="px-2 laptop:px-6 py-2 text-container bg-white rounded-md focus:outline-none"
          >
            Alright!
          </button>
        ) : (
          <div className="grid gap-4 grid-cols-2">
            <button
              onClick={() => {
                if (typeof noCallback !== "undefined") {
                  noCallback();
                }
                isWindowOpenVar(false);
              }}
              className="px-2 laptop:px-6 py-2 text-container bg-white rounded-md focus:outline-none"
            >
              {noMessage}
            </button>
            <button
              onClick={() => {
                if (typeof yesCallback !== "undefined") {
                  yesCallback();
                }
                isWindowOpenVar(false);
              }}
              className="px-2 laptop:px-6 py-2 text-white bg-strong rounded-md focus:outline-none"
            >
              {yesMessage}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
