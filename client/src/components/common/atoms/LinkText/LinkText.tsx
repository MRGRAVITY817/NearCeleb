import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { isLoggedInVar } from "../../../../lib/apollo";
import { isSideBarOpenVar } from "../../molecules/SideBar/SideBar";
import { isWindowOpenVar, windowInfoVar } from "../../molecules/Window/Window";

interface LinkTextProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  url?: string;
  icon?: ReactNode;
  selected: boolean;
  auth?: boolean;
}
export const LinkText: React.FC<LinkTextProps> = ({
  text,
  url = "/",
  icon = null,
  selected = false,
  auth = false,
}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();
  const logInNeeded = auth && !isLoggedIn;
  return (
    <div className="laptop:text-2xl text-xl">
      <Link href={logInNeeded ? "/" : url}>
        <a
          onClick={() => {
            isSideBarOpenVar(false);
            if (logInNeeded) {
              windowInfoVar({
                type: "alert",
                message: "Log in to enjoy the service.",
                alertCallback: () => {
                  router.push("/");
                },
              });
              isWindowOpenVar(true);
            }
          }}
        >
          <div
            className={`flex items-center justify-start 
                        ${selected ? `text-strong` : `text-white`} 
                        font-light transition-all`}
          >
            {icon && <div className="mr-8">{icon}</div>}
            <h1>{text}</h1>
          </div>
        </a>
      </Link>
    </div>
  );
};
