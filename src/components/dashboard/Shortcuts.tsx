import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui';

const links = [
  { label: 'New Order', href: '/trade' },
  { label: 'Deposit', href: '/wallet' },
  { label: 'Bots', href: '/bots' },
  { label: 'Settings', href: '/settings' }
];

export default function Shortcuts() {
  return (
    <Card>
      <CardTitle>Shortcuts</CardTitle>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="rounded-lg border px-3 py-2 text-center hover:bg-gray-50">
            {l.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}
