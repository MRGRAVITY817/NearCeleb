import { makeVar } from "@apollo/client";
import { ReactNode } from "react";

export type PageMenuType =
  | "main"
  | "celebs"
  | "letter"
  | "docs"
  | "dashboard"
  | "admin"
  | "terms"
  | "privacy"
  | "partners";

interface PageMenuItemProps {
  name: string;
  text: string;
  url: string;
  icon: ReactNode;
}

type PageMenuList = PageMenuItemProps[];

export const selectedPageMenuVar = makeVar<PageMenuType>("main");
