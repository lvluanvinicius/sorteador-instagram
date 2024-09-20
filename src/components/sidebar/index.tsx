import { Card, CardFooter, CardHeader } from "@chakra-ui/react";
import { Funnel, UserCircleGear } from "@phosphor-icons/react";
import Link from "next/link";
import { Logout } from "./sign-out";
import { History } from "lucide-react";

export function Sidebar() {
  const links = [
    {
      name: "Minha Conta",
      link: "/account",
      icon: <UserCircleGear size={20} />,
    },
    {
      name: "Sorteador",
      link: "/raffle-maker",
      icon: <Funnel size={20} />,
    },
    {
      name: "Histórico de Sorteios",
      link: "/raffle-maker/histories",
      icon: <History size={20} />,
    },
  ];

  return (
    <aside className="w-[300px] h-screen flex  justify-center items-center">
      <Card className="h-[98vh] w-[95%] flex flex-col items-center justify-between">
        <CardHeader className="flex items-center italic gap-2">
          <Funnel size={24} />
          <h1 className="font-bold text-md">Sort App</h1>
        </CardHeader>
        <ul className="w-full flex flex-col px-4 flex-1">
          {links.map((lk) => {
            return (
              <Link
                key={lk.name}
                href={lk.link}
                className="dark:hover:bg-gray-500 p-2 rounded-md text-sm"
              >
                <li className="flex gap-2 w-full">
                  {lk.icon}
                  <span>{lk.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <CardFooter className="w-full flex flex-col px-4">
          <Logout />
        </CardFooter>
      </Card>
    </aside>
  );
}
