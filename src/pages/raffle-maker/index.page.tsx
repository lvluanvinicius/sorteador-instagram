import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import { Selector } from "./selector";
import { useSession } from "@/contexts/session";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function handler() {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  return (
    <RaffleMakerLayout>
      <Selector />
    </RaffleMakerLayout>
  );
}
