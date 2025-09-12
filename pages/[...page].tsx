// pages/[...page].tsx
import Head from "next/head";
import Link from 'next/link'; 
import type { GetStaticPaths, GetStaticProps } from "next";
import { BuilderComponent, builder } from "@builder.io/react";

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (API_KEY) {
  builder.init(API_KEY);
} else {
  console.warn("[Builder] NEXT_PUBLIC_BUILDER_API_KEY is not set. Skipping Builder fetches.");
}

export const getStaticPaths: GetStaticPaths = async () => {
  // If no API key, don’t call Builder at build time
  if (!API_KEY) return { paths: [], fallback: "blocking" };

  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  const paths =
    pages
      .map((p: any) => p?.data?.url)
      .filter((u: string | undefined): u is string => !!u)
      .filter((u) => u !== "/"); // keep your own homepage

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlPath = "/" + (Array.isArray(params?.page) ? params!.page.join("/") : "");

  if (!API_KEY) {
    return { props: { content: null }, revalidate: 60 };
  }

  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  return { props: { content: content ?? null }, revalidate: 60 };
};

export default function NotFoundLike() {
  return (
    <main style={{padding:'4rem', color:'#e5e7eb', background:'#0b1220', minHeight:'60vh'}}>
      <h1 style={{fontSize:'1.5rem', fontWeight:700}}>Page not found</h1>
      <p style={{marginTop:'0.75rem'}}>This route doesn’t exist. Go back to the <Link href="/">home page</Link>.</p>
      </main>
  )
}
