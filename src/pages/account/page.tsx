import { useSession } from "@/contexts/session";
import { useEffect } from "react";

export function Page() {
  const { notLogged } = useSession();

  return <div className="">teste</div>;
}
