import { VideoPlayer } from "@/components/video-play";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null); // Referência para o elemento de vídeo
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar quando o vídeo está em reprodução

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

      // Quando o timer é acionado, garantimos que o vídeo reinicia do começo
      if (videoRef.current && !isPlaying) {
        videoRef.current.currentTime = 0; // Reinicia o vídeo
        videoRef.current.play(); // Dá play no vídeo
        setIsPlaying(true); // Define como vídeo em execução
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [open, alterTimer, isPlaying]);

  useEffect(() => {
    if (open) {
      setTimerValue(7); // Reinicia o timer para 7 segundos
    }
  }, [open, setTimerValue]);

  // Função que será executada quando o vídeo terminar
  const handleVideoEnded = () => {
    console.log("O vídeo terminou");
    setIsPlaying(false); // Permite que o vídeo possa ser reproduzido novamente no futuro
    // Aqui você pode adicionar mais lógica, como acionar outro vídeo ou apenas encerrar
  };

  return (
    <div
      className={`fixed bg-slate-950 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center text-white text-3xl transition-opacity duration-1000 ${
        isVisible ? (isFadingOut ? "opacity-0" : "opacity-100") : "hidden"
      }`}
    >
      <div className="w-full h-full">
        <VideoPlayer
          ref={videoRef}
          src="/uploads/contagem.mp4"
          onEnded={handleVideoEnded}
        />
      </div>
    </div>
  );
}
