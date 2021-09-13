import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { AiFillCheckCircle, AiFillHeart, AiFillMail } from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import { GiFeather } from "react-icons/gi";
import {
  RiBookOpenFill,
  RiDashboardFill,
  RiHomeFill,
  RiMoneyDollarCircleFill,
  RiQuillPenFill,
} from "react-icons/ri";
import { isLoggedInVar, logUserOut } from "../../../../lib/apollo";
import { LinkText } from "../../atoms/LinkText/LinkText";
import { isSideBarOpenVar } from "../SideBar/SideBar";
import { isWindowOpenVar, windowInfoVar } from "../Window/Window";

interface PageMenuProps {}

export const PageMenu: React.FC<PageMenuProps> = ({}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const route = useRouter();
  const confirmLogout = async () => {
    windowInfoVar({
      type: "confirm",
      message: "Really want to log out?",
      noMessage: "No, I'll stay in NearCeleb",
      yesMessage: "Yes, I want to",
      noCallback: () => {},
      yesCallback: async () => {
        await logUserOut();
        isSideBarOpenVar(false);
      },
    });
    isWindowOpenVar(true);
  };
  return (
    <div className="grid gap-3 laptop:gap-6 grid-flow-row">
      <LinkText
        text="Main"
        url={`${isLoggedIn ? `/trend` : `/`}`}
        icon={
          <RiHomeFill
            className={`${
              route.pathname === "/trend" || route.pathname === "/"
                ? `text-strong`
                : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/trend" || route.pathname === "/"}
      />
      <LinkText
        text="Celebs"
        url="/celebs"
        auth
        icon={
          <AiFillHeart
            className={`${
              route.pathname === "/celebs" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/celebs"}
      />
      <LinkText
        text="Letter"
        url="/letter"
        auth
        icon={
          <AiFillMail
            className={`${
              route.pathname === "/letter" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/letter"}
      />
      <LinkText
        text="Dashboard"
        url="/dashboard"
        auth
        icon={
          <RiDashboardFill
            className={`${
              route.pathname === "/dashboard" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/dashboard"}
      />
      <LinkText
        text="Docs"
        url="/docs"
        icon={
          <RiBookOpenFill
            className={`${
              route.pathname === "/docs" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/docs"}
      />
      <LinkText
        text="Pricing"
        url="/pricing"
        icon={
          <RiMoneyDollarCircleFill
            className={`${
              route.pathname === "/pricing" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/pricing"}
      />
      <LinkText
        text="Admin"
        url="/admin/add-celeb"
        icon={
          <RiQuillPenFill
            className={`${
              route.pathname.startsWith("/admin") ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname.startsWith("/admin")}
      />
      <LinkText
        text="Votes"
        url="/votes"
        icon={
          <RiQuillPenFill
            className={`${
              route.pathname === "/votes" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/votes"}
      />
      <div className="flex items-center justify-center my-8">
        <div className="mr-3 w-full text-center border-t-1 border-white" />
        <img src="/menu-icons/Send.svg" alt="send-icon" />
        <div className="ml-3 w-full text-center border-t-1 border-white" />
      </div>
      <LinkText
        text="Terms"
        url="/terms"
        icon={
          <AiFillCheckCircle
            className={`${
              route.pathname === "/terms" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/terms"}
      />
      <LinkText
        text="Privacy"
        url="/privacy"
        icon={
          <BsShieldLockFill
            className={`${
              route.pathname === "/privacy" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/privacy"}
      />
      <LinkText
        text="Partners"
        url="/partners"
        icon={
          <GiFeather
            className={`${
              route.pathname === "/partners" ? `text-strong` : `text-white`
            }`}
          />
        }
        selected={route.pathname === "/partners"}
      />
      {isLoggedIn && (
        <button
          onClick={() => confirmLogout()}
          className="mt-8 text-lg laptop:text-xl font-light focus:outline-none"
        >
          Log Out
        </button>
      )}
    </div>
  );
};
