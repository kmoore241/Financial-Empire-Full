import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { RenderContent, builder } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type Props = { content: any | null; urlPath: string };

export default function BuilderCatchAll({ content, urlPath }: Props) {
  return (
    <>
      <Head>
        {/* If your Builder page uses Google Fonts, paste the <link> here or set them in _document */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{content?.data?.title || "Site"}</title>
      </Head>

      {/* Your existing header from _app.tsx will still render above this */}
      <RenderContent model="page" content={content} />
      {/* Optional: helpful while wiring things up */}
      {!content && (
        <main className="mx-auto max-w-3xl p-8">
          <h1 className="text-2xl font-semibold">No Builder page found</h1>
          <p className="text-sm text-gray-600">Path: {urlPath}</p>
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Let Builder/Next discover pages at request time
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const urlPath = "/" + (Array.isArray(params?.page) ? params!.page.join("/") : "");
  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  return {
    props: { content: content || null, urlPath },
    revalidate: 60, // ISR: refresh every minute
  };
};
