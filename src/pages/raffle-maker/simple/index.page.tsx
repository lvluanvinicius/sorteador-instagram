import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import { Page } from "./page";
import { useSession } from "@/contexts/session";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function handler() {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  return (
    <RaffleMakerLayout>
      <Page />
    </RaffleMakerLayout>
  );
}
