// components/layout/AppShell.tsx
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-tight">FinancialEmpire</Link>
          <div className="flex gap-6 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/bots">Bots</Link>
            <Link href="/academy">Academy</Link>
            <Link href="/news">News</Link>
            <Link href="/pricing" className="font-medium">Pricing</Link>
            <Link href="/login" className="rounded-md bg-blue-600 px-3 py-1.5 text-white">Log in</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12">{children}</main>
      <footer className="mt-16 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400 flex gap-6">
          <span>© {new Date().getFullYear()} Financial Empire</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/status">Status</Link>
        </div>
      </footer>
    </div>
  )
}
