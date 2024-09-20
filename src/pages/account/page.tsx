import { useSession } from "@/contexts/session";
import { post } from "@/services/app";
import {
  Input,
  Text,
  Box,
  Flex,
  Heading,
  VStack,
  Button,
  useTheme,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
  name: z.string().min(1, "Campo é obrigatório."),
  email: z.string().min(1, "Campo é obrigatório.").email(),
  username: z.string().min(1, "Campo é obrigatório."),
  password: z.string().optional(),
});

type UserFormType = z.infer<typeof userFormSchema>;

export function Page() {
  const { user } = useSession();
  const theme = useTheme();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UserFormType>({
    values: {
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
    },
    resolver: zodResolver(userFormSchema),
  });

  const handleSaveUser = useCallback(async function ({
    email,
    name,
    password,
    username,
  }: UserFormType) {
    try {
      const response = await post(
        "/api/account",
        {
          email,
          name,
          password,
          username,
        },
        { headers: { Accept: "application/json" } }
      );

      if (response.status) {
        toast.success(response.message);
        return;
      }

      throw new Error(response.message);
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      return toast.error("Houve um erro desconhecido.");
    }
  },
  []);

  return (
    <form onSubmit={handleSubmit(handleSaveUser)}>
      {/* Dados de Login */}
      <div className={`!bg-slate-800 p-6 rounded`}>
        <Heading as="h2" mb="5" fontSize="24px" pb="2">
          Dados de Login
        </Heading>
        <VStack spacing="5" align="start">
          <Box w="full">
            <Text mb="1" color="#ccc">
              Nome Completo
            </Text>
            <Input
              type="text"
              placeholder="Nome Completo"
              bg="#1f3650"
              color="white"
              {...register("name")}
            />
          </Box>
          <Box w="full">
            <Text mb="1" color="#ccc">
              Usuário
            </Text>
            <Input
              type="text"
              placeholder="Usuário"
              bg="#1f3650"
              color="white"
              {...register("username")}
            />
          </Box>
          <Box w="full">
            <Text mb="1" color="#ccc">
              Email
            </Text>
            <Input
              type="email"
              placeholder="Email"
              bg="#1f3650"
              color="white"
              {...register("email")}
            />
          </Box>

          <Box w="full">
            <Text mb="1" color="#ccc">
              Senha
            </Text>
            <Input
              type="password"
              placeholder="Senha"
              bg="#1f3650"
              color="white"
              {...register("password")}
            />
          </Box>

          <Box w="full">
            <Button type="submit">
              {isSubmitting ? "Aguarde..." : "Atualizar"}
            </Button>
          </Box>
        </VStack>
      </div>
    </form>
  );
}
