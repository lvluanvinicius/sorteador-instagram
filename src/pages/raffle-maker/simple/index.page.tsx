import { RaffleMakerLayout } from "@/components/layouts/raffle-maker";
import { Page } from "./page";
import { Helmet } from "react-helmet-async";

export default function handler() {
  return (
    <RaffleMakerLayout>
      <Page />
    </RaffleMakerLayout>
  );
}
