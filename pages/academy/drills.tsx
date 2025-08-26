import dynamic from "next/dynamic";
const View = dynamic(async () => {
  try {
    const m = await import("@/modules/LMS/lms/DrillHub");
    return { default: (m as any).default ?? (m as any).DrillHub };
  } catch {
    const fb = await import("@/components/drills/drills/DrillLayout");
    return { default: (fb as any).default ?? (fb as any).DrillLayout };
  }
}, { ssr: false });
export default function Page(){ return <View/>; }
