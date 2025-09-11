import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 text-sm text-slate-600">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Financial Empire</p>
          <nav className="flex gap-5">
            <Link className="hover:text-[--color-brand]" href="/privacy">Privacy</Link>
            <Link className="hover:text-[--color-brand]" href="/terms">Terms</Link>
            <Link className="hover:text-[--color-brand]" href="/offline">Status</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
