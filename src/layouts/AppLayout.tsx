// src/layouts/AppLayout.tsx
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-gray-900">
      <header className="border-b">
        <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/bots">Bots</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/news">News</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/wallet">Wallet</Link>
          <Link href="/settings">Settings</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Financial Empire
        </div>
      </footer>
    </div>
  );
}
