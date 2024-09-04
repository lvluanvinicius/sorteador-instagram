import { ReactNode } from "react";
import { Sidebar } from "../sidebar";

interface DefaultProps {
  children: ReactNode;
}

export function Default({ children }: DefaultProps) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="py-3 px-2 w-full">{children}</main>
    </div>
  );
}
