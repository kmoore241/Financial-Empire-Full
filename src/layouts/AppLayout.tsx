import type { PropsWithChildren } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-slate-900">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-screen-2xl px-4 py-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
