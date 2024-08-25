import { useRouter } from "next/router";
import { Form } from "./form";
import { useSession } from "next-auth/react";

export function Display() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return router.push("/account");
  }

  return (
    <div className="h-screen ">
      <Form />
    </div>
  );
}
