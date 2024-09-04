import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import { Page } from "./page";

export default function handler() {
  return (
    <RaffleMakerLayout>
      <Page />
    </RaffleMakerLayout>
  );
}
