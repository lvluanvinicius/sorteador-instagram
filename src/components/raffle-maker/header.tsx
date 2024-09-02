import { Funnel } from "@phosphor-icons/react";

export function Header() {
  return (
    <header className="w-screen  flex items-center justify-center">
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <div className="flex items-center">
          <Funnel size={24} />
          App Sort
        </div>
        <div />
      </div>
    </header>
  );
}
