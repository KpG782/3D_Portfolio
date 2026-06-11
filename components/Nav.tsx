import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-3 pt-3">
      <div className="glass mx-auto flex h-14 max-w-[1152px] items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-signal"
        >
          ken<span className="text-brass">builds</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-telemetry transition-colors duration-200 hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={site.resumePage}
            className="btn btn-ghost hidden !min-h-10 !px-4 text-sm whitespace-nowrap sm:inline-flex"
          >
            Résumé
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="btn btn-primary !min-h-10 !px-4 text-sm whitespace-nowrap"
          >
            Email
          </a>
        </div>
      </div>
    </header>
  );
}
