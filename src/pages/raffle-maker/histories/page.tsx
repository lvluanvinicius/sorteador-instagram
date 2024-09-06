import { Card, Heading, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function Page() {
  const theme = useTheme();
  const router = useRouter();

  const handlerOpenRaffle = useCallback(
    function (id: string) {
      return router.push(`/raffle-maker/histories/${id}`);
    },
    [router]
  );

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
                <th className="py-5">Usuário Responsável</th>
                <th className="py-5">Descrição</th>
                <th className="py-5 rounded-tr-md">Data de Sorteio</th>
              </tr>
            </thead>

            <tbody className="text-center">
              <tr
                className="bg-gray-900 hover:bg-gray-800 cursor-pointer"
                onClick={() => handlerOpenRaffle("id")}
              >
                <td className="py-4">cm0qrsude0003jnxjriquyagu</td>
                <td className="py-4">Luan Santos</td>
                <td className="py-4">instagram</td>
                <td className="py-4">Sorteio do Celular velho.</td>
              </tr>
              <tr
                className="bg-gray-900 hover:bg-gray-800 cursor-pointer"
                onClick={() => handlerOpenRaffle("id")}
              >
                <td className="py-4">cm0qtgd5p0005jnxj6biss2xm</td>
                <td className="py-4">Luan Santos</td>
                <td className="py-4">simple</td>
                <td className="py-4">Apenas um teste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
