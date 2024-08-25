import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

import { signIn } from "next-auth/react";
import { InstagramLogo } from "@phosphor-icons/react";

export function Form() {
  async function handleSignIn() {
    await signIn("instagram");
  }

  return (
    <Card className="w-[350px] h-[250px] flex flex-wrap translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
      <CardHeader>
        <h2 className="text-xl font-bold">Efetuar Login</h2>
      </CardHeader>
      <CardBody className="w-full flex flex-col">
        <Button
          onClick={handleSignIn}
          variant={"outline"}
          className="!h-[50px]"
        >
          <InstagramLogo size={32} className="mr-4" />
          Entrar Com Instagram
        </Button>
      </CardBody>
      <CardFooter>Termos de uso</CardFooter>
    </Card>
  );
}
