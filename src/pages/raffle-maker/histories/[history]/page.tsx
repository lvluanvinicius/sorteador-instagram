import { getRaffles } from "@/services/queries/get-raffles";
import { dateExtFormatter } from "@/utils/formatter";
import { Card, CardBody, Heading, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Details } from "./details";
import { arrayNumberRandom } from "@/utils/tools";

interface PageProps {
  instance: RafflesInstancesInterface;
}

export function Page({ instance }: PageProps) {
  const router = useRouter();

  const { data: raffles } = useQuery({
    queryKey: ["raffles"],
    queryFn: () => getRaffles({ instance: instance.id }),
  });

  console.log(raffles);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="md:w-[70%] flex flex-col gap-4">
        <Heading as="h1" size="xl" mb="5" textAlign="center" color="white">
          Detalhes do Sorteio
        </Heading>

        <Card>
          <CardBody className="flex flex-col gap-2">
            <h1 className="text-xl opacity-80 font-bold">
              Informações do Sorteio
            </h1>
            <ul className="pl-4">
              <li className="text-justify list-disc">
                <b>Id de Sorteio</b>: {instance.id}
              </li>
              <li className="text-justify list-disc">
                <b>Tipo</b>: {instance.type}
              </li>
              <li className="text-justify list-disc">
                <b>Descrição</b>: {instance.description}
              </li>
              <li className="text-justify list-disc">
                <b>Código</b>: {instance.code}
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col gap-2">
            <h1 className="text-xl opacity-80 font-bold">Ganhadores</h1>
            <table>
              <thead className="text-center">
                <tr className=" text-center w-full dark:bg-slate-700">
                  <th className="py-2 !rounded-tl-md">ID</th>
                  <th className="py-2">Valor Sorteado</th>
                  <th className="py-2 !rounded-tr-md">Data de Sorteio</th>
                </tr>
              </thead>
              <tbody>
                {raffles
                  ? raffles.data.map((raffle) => (
                      <Details key={raffle.id} raffle={raffle} />
                    ))
                  : [...arrayNumberRandom(0, 10)].map((item) => (
                      <tr
                        key={item}
                        className="text-center cursor-pointer hover:bg-slate-800"
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
