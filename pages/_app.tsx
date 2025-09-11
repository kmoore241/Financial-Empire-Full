import type { AppProps } from "next/app";
import "@/styles/globals.css";
import AppLayout from "@/layouts/AppLayout";
import RootProviders from "@/providers/RootProviders"; // if you have it

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <RootProviders>
        <Component {...pageProps} />
      </RootProviders>
    </AppLayout>
  );
}
