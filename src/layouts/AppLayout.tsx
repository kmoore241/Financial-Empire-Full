import Link from "next/link";
import { useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/bots", label: "Bots" },
    { href: "/academy", label: "Academy" },
    { href: "/news", label: "News" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              Financial<span className="text-brand">Empire</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {nav.map(n => (
                <Link key={n.href} href={n.href} className="hover:text-brand">
                  {n.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="rounded-lg border px-3 py-1.5 text-sm hover:border-brand hover:text-brand"
              >
                Log in
              </Link>
            </nav>
            <button
              className="md:hidden rounded-lg border px-3 py-1.5 text-sm"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
          {open && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-2">
                {nav.map(n => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-lg px-3 py-2 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="rounded-lg border px-3 py-2 hover:border-brand hover:text-brand"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-screen-2xl px-4 py-8">{children}</div>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-screen-2xl px-4 py-6 text-sm text-slate-600">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Financial Empire</p>
            <nav className="flex gap-5">
              <Link className="hover:text-brand" href="/privacy">Privacy</Link>
              <Link className="hover:text-brand" href="/terms">Terms</Link>
              <Link className="hover:text-brand" href="/offline">Status</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
