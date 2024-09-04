import { useSession } from "@/contexts/session";
import { Card, CardBody, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userFormSchema = z.object({
  name: z.string().min(1, "Campo é obrigatório."),
  email: z.string().min(1, "Campo é obrigatório.").email(),
  username: z.string().min(1, "Campo é obrigatório."),
  password: z.string().min(1, "Campo é obrigatório."),
});

type UserFormType = z.infer<typeof userFormSchema>;

export function Page() {
  const { user } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserFormType>({
    values: {
      email: user?.email || "",
      username: user?.username || "",
      name: user?.name || "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col justify-start">
      <Card className="">
        <CardBody className="flex flex-col gap-4">
          <div className="border">
            <Text className="">Dados de Login</Text>
            <div>
              <label htmlFor="">
                <Input placeholder="Nome Completo" value={user?.name} />
              </label>
            </div>
          </div>

          <div className="border">
            <Text className="">Dados da Conta</Text>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
