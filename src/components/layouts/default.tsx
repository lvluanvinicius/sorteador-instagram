import { ReactNode } from "react";
import { Sidebar } from "../sidebar";

interface DefaultProps {
  children: ReactNode;
}

export function Default({ children }: DefaultProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="p-2">{children}</main>
    </div>
  );
}
