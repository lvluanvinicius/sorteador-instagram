import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import { Selector } from "./selector";

export default function handler() {
  return (
    <RaffleMakerLayout>
      <Selector />
    </RaffleMakerLayout>
  );
}
