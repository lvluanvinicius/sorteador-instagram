import { Card, CardHeader } from "@chakra-ui/react";
import { Funnel, UserCircleGear } from "@phosphor-icons/react";
import Link from "next/link";

export function Sidebar() {
  const links = [
    {
      name: "Sorteador",
      link: "/raffle-maker",
      icon: <Funnel size={32} />,
    },
    {
      name: "Minha Conta",
      link: "/account",
      icon: <UserCircleGear size={32} />,
    },
  ];

  return (
    <aside className="w-[250px] h-screen flex  justify-center items-center">
      <Card className="h-[98vh] w-[95%] flex flex-col items-center">
        <CardHeader className="flex items-center italic gap-2">
          <Funnel size={24} />
          <h1 className="font-bold text-md">Sort App</h1>
        </CardHeader>
        <ul className="w-full flex flex-col px-4">
          {links.map((lk) => {
            return (
              <Link
                key={lk.name}
                href={lk.link}
                className="dark:hover:bg-gray-500 p-2 rounded-md"
              >
                <li className="">{lk.name}</li>
              </Link>
            );
          })}
        </ul>
      </Card>
    </aside>
  );
}
