import { Button } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";

export function Posts() {
  const { status } = useSession();
  console.log(status);

  return (
    <div>
      <Button onClick={() => signIn("instagram")}>Entrar</Button>
    </div>
  );
}
