import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/bots", label: "Bots" },
  { href: "/academy", label: "Academy" },
  { href: "/news", label: "News" },
  { href: "/pricing", label: "Pricing" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Financial<span className="text-[--color-brand]">Empire</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-[--color-brand]">
                {n.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-lg border px-3 py-1.5 text-sm hover:border-[--color-brand] hover:text-[--color-brand]"
            >
              Log in
            </Link>
          </nav>

          <button
            className="md:hidden rounded-lg border px-3 py-1.5 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        {open && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col gap-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="rounded-lg border px-3 py-2 hover:border-[--color-brand] hover:text-[--color-brand]"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
