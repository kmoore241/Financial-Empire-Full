import dynamic from "next/dynamic";
const View = dynamic(async () => {
  try {
    const m = await import("@/components/bots/bots/RiskSettings");
    return { default: (m as any).default ?? (m as any).RiskSettings };
  } catch {
    const fb = await import("@/components/pages/Academy");
    return { default: (fb as any).default ?? (() => null) };
  }
}, { ssr: false });
export default function Page(){ return <View/>; }
