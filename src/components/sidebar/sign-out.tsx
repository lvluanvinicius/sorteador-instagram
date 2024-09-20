import { FetchError, post } from "@/services/app";
import { Button } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "sonner";

export function Logout() {
  const router = useRouter();

  const handleLogout = useCallback(async function () {
    try {
      const response = await post(
        "/api/sign-out",
        {},
        { headers: { Accept: "application/json" } }
      );

      if (response.status) {
        return router.push("/sign-in");
      }

      throw new Error(response.message);
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.status === 401) {
          return router.push("/sign-in");
        }
        toast.error(error.message);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Houve um erro desconhecido.");
    }
    console.log("teste");
  }, []);

  return (
    <ul className="">
      <Button
        bg={"none"}
        onClick={handleLogout}
        className="dark:hover:bg-gray-500 p-2 rounded-md text-sm w-full"
      >
        <li className="flex gap-2 w-full">
          <LogOut size={20} /> <span>Sair</span>
        </li>
      </Button>
    </ul>
  );
}
