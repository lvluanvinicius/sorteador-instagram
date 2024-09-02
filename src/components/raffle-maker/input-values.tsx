import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, useCallback } from "react";

interface InputValuesProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputValues({ value, onChange }: InputValuesProps) {
  const handlerChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.currentTarget.value);
    },
    [onChange]
  );

  return (
    <Textarea
      placeholder="Informe os nomes a serem sorteados separados por vírgula."
      bg="secondary.100"
      className="flex-1 !bg-transparent !border-none h-full placeholder:text-xl"
      rows={5}
      cols={30}
      onChange={handlerChange}
      value={value}
      resize={"none"}
    />
  );
}

// <Textarea
//   bg={"primary.default"}
//   className="shadow-md rounded-md shadow-black/35 w-full md:w-[70%] bg-primary-default"
// />
