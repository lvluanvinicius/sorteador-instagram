import { getRafflesInstances } from "@/services/queries/raffles-instances";
import { Card, Heading, Skeleton, useTheme } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function Page() {
  const router = useRouter();

  const handlerOpenRaffle = useCallback(
    function (id: string) {
      return router.push(`/raffle-maker/histories/${id}`);
    },
    [router]
  );

  const { data: rafflesInstances } = useQuery({
    queryKey: ["raffles-instances"],
    queryFn: getRafflesInstances,
  });

  return (
    <div className="flex flex-col w-full items-center">
      <div className="md:w-[70%]">
        <Heading as="h1" size="xl" mb="5" textAlign="center" color="white">
          Histórico de sorteios
        </Heading>

        <div className="w-full">
          <table className="w-full">
            <thead className="text-center w-full dark:bg-slate-700 rounded">
              <tr className="">
                <th className="py-5 !rounded-tl-md">ID</th>
                <th className="py-5">Descrição</th>
                <th className="py-5 !rounded-tr-md">Data de Sorteio</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {rafflesInstances
                ? rafflesInstances.data.map((instance) => {
                    return (
                      <tr
                        key={instance.id}
                        className="bg-gray-900 hover:bg-gray-800 cursor-pointer"
                        onClick={() => handlerOpenRaffle(instance.id)}
                      >
                        <td className="py-4">{instance.id}</td>
                        <td className="py-4">{instance.type}</td>
                        <td className="py-4">{instance.description}</td>
                      </tr>
                    );
                  })
                : [1, 2, 3, 4].map((item) => (
                    <tr
                      key={item}
                      className="bg-gray-900 hover:bg-gray-800 cursor-pointer"
                    >
                      <td className="py-4 px-10">
                        <Skeleton className="h-5 w-full" />
                      </td>
                      <td className="py-4 px-10">
                        <Skeleton className="h-5 w-full" />
                      </td>
                      <td className="py-4 px-10">
                        <Skeleton className="h-5 w-full" />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
