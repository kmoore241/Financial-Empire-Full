import dynamic from "next/dynamic";
const View = dynamic(async () => {
  try {
    const m = await import("@/components/misc/news/NewsFeed");
    return { default: (m as any).default ?? (m as any).NewsFeed };
  } catch {
    const fb = await import("@/components/misc/news/HeadlinesGrid");
    return { default: (fb as any).default ?? (fb as any).HeadlinesGrid };
  }
}, { ssr: false });
export default function Page(){ return <View/>; }
