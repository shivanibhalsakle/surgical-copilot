"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  ChartNoAxesCombined,
  FileText,
  Info,
} from "lucide-react";

const navigationItems = [
  {
    name: "Patients",
    href: "/patients",
    icon: CircleUserRound,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  
  {
    name: "Info",
    href: "/info",
    icon: Info,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-[1500px] items-center justify-between px-6">
        <div>
          <Link
            href="/patients"
            className="text-2xl font-bold tracking-[0.14em] text-blue-700"
          >
            O.R.A.C.L.E.
          </Link>

          <p className="mt-1 text-xs text-slate-500">
            Operating Room AI Clinical Learning & Evaluation
          </p>
        </div>

        <nav className="flex h-20 items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-full items-center gap-2 border-b-2 px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-600 hover:text-blue-700"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}