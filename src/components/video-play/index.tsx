import { useEffect, useState } from "react";

export function VideoPlayer({ src }: { src: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marca como montado apenas no lado do cliente
  }, []);

  if (!isClient) {
    // Renderiza um fallback vazio durante a renderização no servidor
    return null;
  }

  return (
    <video controls={false} autoPlay muted className="!w-screen h-screen">
      <source src={src} type="video/mp4" className="w-screen h-screen" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
}
