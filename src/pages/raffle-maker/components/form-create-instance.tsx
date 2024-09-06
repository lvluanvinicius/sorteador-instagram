import { post } from "@/services/app";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schemaCreateInstance = z.object({
  type: z.string().min(1, "Tipo de instância é obrigatória."),
  description: z
    .string()
    .min(1, "A Descrição para a instância do sorteio é obrigatória.")
    .max(255, "A Descrição deve conter no máximo 255 caracteres."),
});

type CreateNewInstanceType = z.infer<typeof schemaCreateInstance>;

export function FormCreateInstance({ type }: { type: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<CreateNewInstanceType>({
    defaultValues: {
      type: type,
    },
    resolver: zodResolver(schemaCreateInstance),
  });

  const handlerSaveInstance = useCallback(
    async function ({ description, type }: CreateNewInstanceType) {
      try {
        const response = await post<ReffleInstance>(
          "/api/raffles/instances/create",
          {
            type,
            description,
          },
          { headers: { Accept: "application/json" } }
        );

        // Validando retorno.
        if (response.status) {
          const { data } = response;

          nookies.set(null, "instance_id", data.id, {
            path: "/",
          });

          if (type === "instagram") {
            return router.push(`${router.pathname}/instagram`);
          }

          if (type === "simple") {
            return router.push(`${router.pathname}/simple`);
          }
        }

        throw new Error(response.message);
      } catch (error) {
        if (error instanceof Error) {
          return toast.error(error.message);
        }

        return toast.error("Houve um erro desconhecido.");
      }
    },
    [router]
  );

  return (
    <>
      <Button className="w-full" onClick={onOpen}>
        Começar
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(handlerSaveInstance)}>
          <ModalHeader>
            <div className="flex flex-col gap-0">
              <h3>Iniciar novo Sorteio</h3>
              <small className="text-sm opacity-80">Tipo: {type}</small>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>
              <span className="text-md font-bold opacity-70">Descrição</span>
              <Textarea
                rows={8}
                cols={30}
                resize={"none"}
                maxLength={255}
                {...register("description")}
                placeholder="Sorteio de dois carros do dia dos pais."
                className={`${
                  errors.description && "!border-red-500"
                } border border-transparent !outline-0`}
              ></Textarea>
              {errors.description ? (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              ) : null}
            </label>
          </ModalBody>
          <ModalFooter display={"flex"} gap={4}>
            <Button className="w-full" flex={1} type="submit">
              {isSubmitting ? "Iniciando..." : "Iniciar"}
            </Button>
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
