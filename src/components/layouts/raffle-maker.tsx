import { ReactNode } from "react";
import { Header } from "../raffle-maker/header";

interface RaffleMakerProps {
  children: ReactNode;
}

export function RaffleMakerLayout({ children }: RaffleMakerProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
