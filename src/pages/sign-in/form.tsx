import { useSession } from "@/contexts/session";
import { Card, CardHeader, CardBody, Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório."),
  password: z.string().min(1, "Senha é obrigatória."),
});

type SignInType = z.infer<typeof signInSchema>;

export function Form() {
  const router = useRouter();
  const { signIn, isAuthenticated } = useSession();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = async ({ password, username }: SignInType) => {
    try {
      // Redirecionar ou lidar com a resposta aqui
      const auth = await signIn(username, password);

      if (auth.status) {
        return router.push("/account");
      }

      throw new Error(auth.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Houve um erro desconhecido.");
      }
    }
  };

  useEffect(() => {
    async () => {
      if (isAuthenticated) {
        return router.replace("/account");
      }
    };
  }, [isAuthenticated]);

  return (
    <Card className="w-[350px] h-[300px] translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
      <CardHeader>
        <h2 className="text-xl font-bold">Efetuar Login</h2>
      </CardHeader>
      <CardBody
        className="w-full flex flex-col gap-4"
        as={"form"}
        onSubmit={handleSubmit(handleSignIn)}
      >
        {/* Campo de entrada para o username */}
        <Input type="text" placeholder="Usuário" {...register("username")} />

        {/* Campo de entrada para o password */}
        <Input type="password" placeholder="Senha" {...register("password")} />

        {/* Botões de ação */}
        <div className="flex gap-4">
          <Button
            className="w-full flex-1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Aguarde..." : "Entrar"}
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
