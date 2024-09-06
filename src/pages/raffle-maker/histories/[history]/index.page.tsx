import { UseLayout } from "@/components/layouts/_useLayout";
import { Page } from "./page";

export default function handler() {
  return (
    <UseLayout>
      <Page />
    </UseLayout>
  );
}
