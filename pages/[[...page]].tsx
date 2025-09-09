// pages/[[...page]].tsx
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import RenderContent, { builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = { content: any; urlPath: string };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const urlPath =
    "/" + (Array.isArray(params?.page) ? params!.page.join("/") : "");

  const content = await builder
    .get("page", {
      userAttributes: { urlPath },
      prerender: true,
    })
    .toPromise();

  if (!content) {
    // Let Next handle with your normal /pages route or 404
    return { notFound: true, revalidate: 1 };
  }

  return {
    props: { content, urlPath },
    revalidate: 60, // ISR
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
    limit: 200,
  });

  return {
    paths: pages.map((p) => p.data?.url).filter(Boolean) as string[],
    fallback: "blocking",
  };
};

export default function CatchAll({ content }: Props) {
  return (
    <>
      <Head>
        <title>{content?.data?.title ?? "Page"}</title>
      </Head>
      <RenderContent model="page" content={content} />
    </>
  );
}
