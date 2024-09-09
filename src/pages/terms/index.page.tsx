import { Page } from "./page";
import { Helmet } from "react-helmet-async";

export default function handle() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Helmet title={`Termos de Uso`} />
      <Page />
    </div>
  );
}
