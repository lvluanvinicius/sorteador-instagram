import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface NavigationOptionsProps {
  links: {
    name: string;
    path: string;
    active: boolean;
  }[];
}

export function NavigatePages({ links }: NavigationOptionsProps) {
  return (
    <ul className="flex w-full items-center">
      {links.map((lk) => {
        return (
          <li key={lk.name} className="text-sm">
            {lk.active ? (
              <span className="text-slate-400" key={lk.name}>
                {lk.name}
              </span>
            ) : (
              <div className="flex items-center">
                <Link href={lk.path}>{lk.name}</Link>
                <ChevronRight size={16} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
