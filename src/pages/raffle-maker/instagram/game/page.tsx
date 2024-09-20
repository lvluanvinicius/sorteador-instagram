import { FetchError, get, post } from "@/services/app";
import { removeDuplicated, sortKeys } from "@/utils/tools";
import { Session } from "@prisma/client";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Heading } from "@chakra-ui/react";
import { Timer } from "../../timer";
import { Funnel } from "@phosphor-icons/react";
import { InputValues } from "@/components/raffle-maker/input-values";
import { NavigatePages } from "@/components/navigate-pages";

interface InstagramGamePage {
  session: Session;
}

export function Page({ session }: InstagramGamePage) {
  const router = useRouter();
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerValue, setTimerValue] = useState<number>(7);
  const [keys, setKeys] = useState("");
  const [keysSelected, setKeysKeySelected] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlerGetComments = useCallback(
    async function () {
      try {
        const response = await get(
          `/api/instagram/comments/${router.query.post}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status) {
          const { data } = response.data as {
            data: InstagramComments[];
          };

          // Recuperando usuários.
          const comments = removeDuplicated(
            data.map((comment) => comment.username)
          );

          if (comments.length < 1) {
            throw new Error(
              "Nenhum usuário foi encontrado no post selecionado ou possui apenas um comentário. "
            );
          }

          setKeys(comments.join(",\n"));

          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  const handleSort = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setKeysKeySelected(null);

      // Transformando array.
      const newKeys = removeDuplicated(keys.split(","));

      if (newKeys.length < 2) {
        setErrorMessage(
          "Informe ao menos duas palavras separadas por vírgula."
        );

        return;
      }

      setTimerOpen(true);
      setErrorMessage(null);

      // Efetuando o sorteio das palavras.
      const keySelected = sortKeys(newKeys);

      if (!keySelected) {
        setErrorMessage("Houve um erro ao tentar sortear as palavras.");
        return;
      }

      setKeysKeySelected(keySelected);

      try {
        // Enviando resultado do sorteio para ser salvo.
        const response = await post(
          "/api/raffles/save",
          {
            type: "instagram",
            sorted_value: keySelected,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        // Valida se foi salvo corretamente.
        if (!response.status) {
          setErrorMessage(response.message);
        }
      } catch (error) {
        if (error instanceof FetchError) {
          setErrorMessage(error.message);
          return;
        }

        setErrorMessage("Houve um erro desconhecido.");
      }
    },
    [keys, setKeysKeySelected, setErrorMessage]
  );

  useEffect(() => {
    handlerGetComments();
  }, [handlerGetComments]);

  const navigationOptions = [
    {
      name: "Início",
      path: "/account",
      active: false,
    },
    {
      name: "Opções de Sorteios",
      path: "/raffle-maker",
      active: false,
    },
    {
      name: "Posts do Instagram",
      path: "/raffle-maker/instagram",
      active: false,
    },
    {
      name: "Sorteio Pelo Instagram",
      path: "",
      active: true,
    },
  ];

  return (
    <>
      <Timer
        open={timerOpen}
        setOpen={setTimerOpen}
        timerValue={timerValue}
        setTimerValue={setTimerValue}
      />
      <div className="flex flex-col gap-4">
        <form
          className="flex items-center justify-center flex-col gap-4"
          onSubmit={(event) => handleSort(event)}
        >
          <div className="md:!w-[70%] w-full">
            <Heading
              as="h1"
              size="xl"
              mb="5"
              textAlign="center"
              color="white"
              opacity={0.8}
            >
              Sorteio Pelo Instagram
            </Heading>
            <NavigatePages links={navigationOptions} />
          </div>
          <Card
            className="md:!w-[70%] w-full !shadow h-[22.5rem]"
            bg={"secondary.500"}
          >
            <CardBody className="flex items-center gap-4">
              <div className="px-4">
                <Funnel size={50} />
              </div>
              <div className="dark:bg-white w-[.1rem] h-full opacity-15" />
              <div className="w-full">
                <InputValues onChange={setKeys} value={keys} />
                <hr />
              </div>
            </CardBody>
          </Card>

          {errorMessage && (
            <div className="text-red-500 text-center py-4 font-semibold text-md">
              <p>{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="!h-20 md:!w-[70%] w-full !text-xl tracking-tight"
          >
            Iniciar
          </Button>
        </form>

        {keysSelected && (
          <div className="flex items-center justify-center ">
            <Card className="md:!w-[70%] w-full !shadow ">
              <CardBody>
                <span className="font-bold text-md mr-2">Resultado:</span>
                <span>{keysSelected}</span>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
