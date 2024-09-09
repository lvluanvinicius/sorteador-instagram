import { dateExtFormatter } from "@/utils/formatter";
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
import { useRef } from "react";

export function Details({ raffle }: { raffle: RafflesInterface }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <tr
        onClick={onOpen}
        className="text-center cursor-pointer hover:bg-slate-800"
      >
        <td className="py-4 px-10">{raffle.id}</td>
        <td className="py-4 px-10">{raffle.sorted_value}</td>
        <td className="py-4 px-10">
          {dateExtFormatter(raffle.sort_date.toString())}
        </td>
      </tr>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col gap-0">
              <h3>Detalhes do Resultado</h3>
              <small className="text-sm opacity-80"></small>
            </div>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <ul className="text-sm flex flex-col gap-2 py-4 px-2">
              <li className="w-full flex justify-between">
                <b>ID de Sorteio: </b>
                <span className="opacity-85">{raffle.rafflesInstancesId}</span>
              </li>
              <li className="w-full flex justify-between">
                <b>Valor Sorteado: </b>
                <span className="opacity-85">{raffle.sorted_value}</span>
              </li>
              <li className="w-full flex justify-between">
                <b>Tipo: </b>
                <span className="opacity-85">{raffle.type}</span>
              </li>
              <li className="w-full flex justify-between">
                <b>ID de Usuário: </b>
                <span className="opacity-85">{raffle.user_id}</span>
              </li>
              <li className="w-full flex justify-between">
                <b>Sorteado no: </b>
                <span className="opacity-85">
                  {dateExtFormatter(raffle.sort_date.toString())}
                </span>
              </li>
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button type="button" className="w-full" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
