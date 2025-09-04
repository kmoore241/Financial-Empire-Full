import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
const links = [
  { href: '/bots', label: 'Bots' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/settings', label: 'Settings' },
  { href: '/news', label: 'News' },
  { href: '/academy', label: 'Academy' },
];
export default function Shortcuts() {
  return (
    <Card>
      <div className="mb-2 text-sm text-gray-500">Shortcuts</div>
      <div className="grid grid-cols-2 gap-2">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}
