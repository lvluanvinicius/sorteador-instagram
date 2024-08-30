import { post } from "@/services/app";
import { Card, CardHeader, CardBody, Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório."),
  email: z.string().min(1, "E-mail obrigatório.").email(),
  username: z.string().min(1, "Usuário obrigatório."),
  password: z.string().min(1, "Senha obrigatória."),
});

type SignUpType = z.infer<typeof signUpSchema>;

export function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = useCallback(async function ({
    email,
    name,
    password,
    username,
  }: SignUpType) {
    const response = await post("/api/sign-up", {
      email,
      username,
      password,
      name,
    });
    console.log(response);
  },
  []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Card className="w-[390px] h-[400px]  translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
      <CardHeader>
        <h2 className="text-xl font-bold">Criar conta</h2>
      </CardHeader>
      <CardBody
        className="w-full flex flex-col gap-4"
        as={"form"}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Input
          type="text"
          placeholder="Nome*"
          {...register("name")}
          className={`${errors.name && " !border-red-500"}`}
        />

        <Input
          type="email"
          placeholder="E-mail*"
          {...register("email")}
          className={`${errors.email && " !border-red-500"}`}
        />

        <Input
          type="text"
          placeholder="Usuário*"
          {...register("username")}
          className={`${errors.username && " !border-red-500"}`}
        />

        <Input
          type="password"
          placeholder="Senha*"
          {...register("password")}
          className={`${errors.password && " !border-red-500"}`}
        />

        <div className="flex gap-4">
          <Button className="w-full flex-1" type="submit">
            Registrar
          </Button>
          <Link href={"/sign-in"}>
            <Button className="w-[100px]" type="button">
              Entrar
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
