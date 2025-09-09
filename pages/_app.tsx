import Link from 'next/link';
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import AppLayout from "@/layouts/AppLayout";
import RootProviders from "@/providers/RootProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-7xl px-4 py-3 flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/bots">Bots</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/news">News</Link>
          <Link href="/settings">Settings</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/certificate">Certificate</Link>
          <Link href="/wallet">Wallet</Link>
          <Link href="/login">Login</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/trade-history">Trade History</Link>
          <Link href="/course-detail">Course Detail</Link>
        </nav>
      </header>

      <RootProviders>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RootProviders>
  );
}
