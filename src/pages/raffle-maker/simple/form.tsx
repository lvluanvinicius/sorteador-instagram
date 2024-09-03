import { InputValues } from "@/components/raffle-maker/input-values";
import { removeDuplicated, sortKeys } from "@/utils/tools";
import { Button, Card, CardBody } from "@chakra-ui/react";
import { Funnel } from "@phosphor-icons/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Timer } from "../timer";
import { post } from "@/services/app";

export function Form() {
  const [keys, setKeys] = useState("");
  const [keysSelected, setKeysKeySelected] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerValue, setTimerValue] = useState<number>(5);

  const saveResult = useCallback(async () => {
    // Enviando resultado do sorteio para ser salvo.
    const response = await post(
      "/api/raffles-save",
      {
        type: "simple",
        sorted_value: keysSelected,
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
  }, [keysSelected, setErrorMessage]);

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
      await saveResult();
    },
    [keys, setKeysKeySelected, setErrorMessage]
  );

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
          <Card
            className="md:!w-[70%] w-full !shadow h-[12.5rem]"
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
