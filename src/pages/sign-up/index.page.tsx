import { useEffect } from "react";
import { Form } from "./form";
import { useSession } from "@/contexts/session";
import { useRouter } from "next/router";

export default function handler() {
  const router = useRouter();
  const { isAuthenticated } = useSession();

  return (
    <div className="h-screen">
      <Form />
    </div>
  );
}
