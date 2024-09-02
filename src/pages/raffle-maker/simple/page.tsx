import { Form } from "./form";

export function Page() {
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <Form />
      </div>
    </div>
  );
}
