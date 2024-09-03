import { useCallback, useEffect } from "react";

export function Timer({
  open,
  setOpen,
  setTimerValue,
  timerValue,
}: {
  open: boolean;
  timerValue: number;
  setOpen: (value: boolean) => void;
  setTimerValue: (value: number) => void;
}) {
  const alterTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      // Use o valor atual de `timerValue` diretamente
      if (timerValue > 1) {
        setTimerValue(timerValue - 1); // Decrementa o valor de timerValue
      } else {
        clearInterval(intervalId); // Limpa o intervalo quando o timer chega a 0
        setOpen(false); // Fecha o timer
        setTimerValue(0); // Define o valor final para 0
      }
    }, 1000); // Executa a cada 1000ms (1 segundo)

    return intervalId; // Retorna o ID do intervalo para que possamos limpá-lo
  }, [timerValue, setTimerValue, setOpen]); // Inclua `timerValue` e `setTimerValue` nas dependências

  useEffect(() => {
    if (open) {
      const intervalId = alterTimer();

      // Limpa o intervalo quando o componente for desmontado ou quando `open` mudar para false
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
