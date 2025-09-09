// pages/[...page].tsx
import Head from "next/head";
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

export default function CatchAll({ content }: { content: any }) {
  if (!content) return <></>; // or your 404 UI
  return (
    <>
      <Head>
        <title>{content?.data?.title ?? "Page"}</title>
      </Head>
      <BuilderComponent model="page" content={content} />
    </>
  );
}
