import { Helmet, HelmetProvider } from "react-helmet-async";
import { Page } from "./page";

export default function handle() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Helmet title={`Políticas de Privacidade`} />
      <Page />
    </div>
  );
}
