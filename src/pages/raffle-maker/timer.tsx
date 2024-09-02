import { useCallback, useEffect, useState } from "react";

export function Timer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [timerValue, setTimerValue] = useState(5);

  const alterTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      setTimerValue((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(intervalId); // Parar o intervalo quando o timer chega a 0 ou menos
          setOpen(false); // Fechar o timer quando o contador chegar a 0
          return 0;
        }

        return prevValue - 1;
      });
    }, 1000); // A cada 1000ms (1 segundo)

    return intervalId; // Retornar o ID do intervalo para que possamos limpá-lo
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      const intervalId = alterTimer();

      // Limpar o intervalo quando o componente for desmontado ou quando o `open` mudar para false
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [open, alterTimer]);

  useEffect(() => {
    if (open) {
      setTimerValue(5);
    }
  }, [open, setTimerValue]);

  return (
    <div
      className={`${
        open ? "fixed" : "hidden"
      } bg-red-600 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center text-white text-3xl`}
    >
      {timerValue}
    </div>
  );
}
