import { Button, Card, CardBody } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Error() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen">
      <Card className="w-[25rem] translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] py-4">
        <CardBody className="flex flex-col gap-4 ">
          <p className="w-full text-center">
            {router.query.error ? router.query.error : "Erro não retornado."}
          </p>
          <Link href={"/sign-in"}>
            <Button className="w-full">Voltar ao Login</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
