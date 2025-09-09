// pages/privacy.tsx
import Head from "next/head";
import type { GetStaticProps } from "next";
import { BuilderComponent, builder } from "@builder.io/react";

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (API_KEY) builder.init(API_KEY);

export const getStaticProps: GetStaticProps = async () => {
  if (!API_KEY) {
    return { props: { content: null }, revalidate: 60 };
  }

  const content = await builder
    .get("page", { userAttributes: { urlPath: "/privacy" } })
    .toPromise();

  return { props: { content: content ?? null }, revalidate: 60 };
};

export default function PrivacyPage({ content }: { content: any }) {
  if (content) {
    return (
      <>
        <Head>
          <title>{content?.data?.title ?? "Privacy"}</title>
        </Head>
        <BuilderComponent model="page" content={content} />
      </>
    );
  }

  // Fallback: your existing UI stays intact
  return (
    <>
      <Head><title>Privacy</title></Head>
      {/* your current privacy markup here */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <p className="mt-4">Your existing content…</p>
      </main>
    </>
  );
}
