import { Button } from "@chakra-ui/react";
import { Funnel } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  return (
    <header className="w-screen  flex items-center justify-center">
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <Button
          className="flex items-center hover:!bg-transparent"
          variant={"ghost"}
          onClick={router.back}
        >
          <Funnel size={24} />
          App Sort
        </Button>
        <div />
      </div>
    </header>
  );
}
