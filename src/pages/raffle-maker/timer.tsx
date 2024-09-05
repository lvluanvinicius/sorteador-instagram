import { VideoPlayer } from "@/components/video-play";
import { useCallback, useEffect, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(open); // Estado para controlar a visibilidade
  const [isFadingOut, setIsFadingOut] = useState(false); // Estado para controlar o fade-out

  const alterTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      if (timerValue > 1) {
        setTimerValue(timerValue - 1); // Decrementa o valor de timerValue
      } else {
        clearInterval(intervalId); // Limpa o intervalo quando o timer chega a 0
        setIsFadingOut(true); // Inicia a animação de fade-out
        setTimeout(() => {
          setOpen(false); // Fecha o timer após a animação de fade-out
          setIsVisible(false); // Oculta o componente após o fade-out
          setTimerValue(0); // Define o valor final para 0
        }, 500); // 500ms é a duração da animação de fade-out
      }
    }, 1000); // Executa a cada 1000ms (1 segundo)

    return intervalId;
  }, [timerValue, setTimerValue, setOpen]);

  useEffect(() => {
    if (open) {
      setIsVisible(true); // Mostra o componente com animação de fade-in
      setIsFadingOut(false); // Reseta o estado de fade-out
      const intervalId = alterTimer();

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [open, alterTimer]);

  useEffect(() => {
    if (open) {
      setTimerValue(7); // Reinicia o timer para 7 segundos
    }
  }, [open, setTimerValue]);

  return (
    <div
      className={`fixed bg-slate-950 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center text-white text-3xl transition-opacity duration-1000 ${
        isVisible ? (isFadingOut ? "opacity-0" : "opacity-100") : "hidden"
      }`}
    >
      <div className="w-full h-full">
        <VideoPlayer src="/uploads/contagem.mp4" />
      </div>
    </div>
  );
}
