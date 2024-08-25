import { ReactNode } from "react";
import { Default } from "./default";

interface UseLayoutProps {
  children: ReactNode;
}

export function UseLayout({ children }: UseLayoutProps) {
  return <Default>{children}</Default>;
}
