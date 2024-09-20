import { Button } from "@chakra-ui/react";
import { Funnel } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="w-[95%] md:w-[75%] flex items-center justify-between py-2 ">
        <header className="">
          <Link className="flex items-center hover:!bg-transparent" href={"/"}>
            <Funnel size={24} />
            App Sort
          </Link>
          <div />
        </header>

        <ul className="flex gap-2 items-center">
          <li>
            <Link href="/sign-up">
              <Button className="border-[2px]" bg={"none"}>
                Registrar
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/sign-in">
              <Button className="border-[2px]" bg={"none"}>
                Entrar
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className="w-[95%] md:w-[75%] flex items-center py-2 ml-auto justify-between max-[calc(100vw - (100vw - 1160px) / 2)] h-[100vh]">
        <div className="max-[480px] py-0 px-10"></div>
        <div className="w-[50rem] p-8 overflow-hidden">
          <Image
            src={"/uploads/sorteador.png"}
            width={1920}
            height={1080}
            alt=""
            className="rounded-xl shadow-md shadow-slate-950 translate-x-[-50]"
          />
        </div>
      </div> */}
    </div>
  );
}
