import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Form } from "./form";

export default function handler({ csrfToken }: { csrfToken: string }) {
  return (
    <div className="h-screen">
      <Form />
    </div>
  );
}
