import { forwardRef, LegacyRef, useEffect, useState } from "react";

export const VideoPlayer = forwardRef<
  HTMLVideoElement,
  { src: string; onEnded: () => void }
>(({ src, onEnded }, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marca como montado apenas no lado do cliente
  }, []);

  if (!isClient) {
    // Renderiza um fallback vazio durante a renderização no servidor
    return null;
  }

  return (
    <video
      ref={ref} // Aqui usamos a ref corretamente com forwardRef
      controls={false}
      muted
      className="!w-screen h-screen"
      onEnded={onEnded} // Chama a função quando o vídeo termina
    >
      <source src={src} type="video/mp4" className="w-screen h-screen" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
});

VideoPlayer.displayName = "VideoPlayer"; // Necessário para componentes com forwardRef
