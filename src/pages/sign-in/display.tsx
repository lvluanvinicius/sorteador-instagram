import { signIn, useSession } from "next-auth/react";

export function Display() {
  const { status, data } = useSession();

  async function handleSignIn() {
    await signIn("instagram");
  }

  return (
    <div>
      Efetuar Login com Instagram:
      <br />
      <button onClick={handleSignIn}>Entrar</button>
      <br />
      <br />
      <div>Status: {status}</div>
      <div>Dados: {JSON.stringify(data)}</div>
    </div>
  );
}
