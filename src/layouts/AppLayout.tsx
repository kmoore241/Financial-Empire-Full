import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap gap-4 text-sm">
          {[
            ['Home', '/'],
            ['Dashboard', '/dashboard'],
            ['Bots', '/bots'],
            ['Academy', '/academy'],
            ['News', '/news'],
            ['Settings', '/settings'],
            ['Pricing', '/pricing'],
            ['Certificate', '/certificate'],
            ['Wallet', '/wallet'],
            ['Login', '/login'],
            ['Privacy', '/privacy'],
            ['Terms', '/terms'],
            ['Trade History', '/trade-history'],
            ['Course Detail', '/course-detail'],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
