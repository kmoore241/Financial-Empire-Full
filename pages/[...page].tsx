// pages/[...page].tsx
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { BuilderComponent, builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  // Don’t include "/" (home) and optionally skip routes you already implement
  const paths = pages
    .map((p: any) => p?.data?.url)
    .filter((u: string | undefined): u is string => !!u)
    .filter((u) => u !== "/");

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlPath =
    "/" + (Array.isArray(params?.page) ? params!.page.join("/") : "");

  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  return { props: { content: content ?? null }, revalidate: 60 };
};

export default function CatchAll({ content }: { content: any }) {
  if (!content) return <></>; // or your 404
  return (
    <>
      <Head>
        <title>{content?.data?.title ?? "Page"}</title>
      </Head>
      <BuilderComponent model="page" content={content} />
    </>
  );
}
