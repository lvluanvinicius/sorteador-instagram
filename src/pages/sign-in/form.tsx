import { Card, CardHeader, CardBody, Button, Input } from "@chakra-ui/react";
import Link from "next/link";

export function Form({ csrfToken }: { csrfToken: string }) {
  return (
    <Card className="w-[350px] h-[300px]  translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
      <CardHeader>
        <h2 className="text-xl font-bold">Efetuar Login</h2>
      </CardHeader>
      <CardBody
        className="w-full flex flex-col gap-4"
        as={"form"}
        method="post"
        action="/api/auth/callback/credentials"
      >
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <Input type="text" name="username" placeholder="Usuário" />

        <Input type="password" name="password" placeholder="Senha" />

        <div className="flex gap-4">
          <Button className="w-full flex-1" type="submit">
            Entrar
          </Button>
          <Link href={"/sign-up"}>
            <Button className="w-full" type="button">
              Registrar
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
