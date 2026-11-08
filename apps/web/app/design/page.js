import { notFound } from "next/navigation";
import { DesignSystemPreview } from "@/components/design/DesignSystemPreview";

export const metadata = {
  title: "Design system",
  description: "Internal Control Plane token preview.",
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  // TODO(launch): remove /design route and NEXT_PUBLIC_DESIGN_PREVIEW flag.
  if (process.env.NEXT_PUBLIC_DESIGN_PREVIEW !== "true") {
    notFound();
  }

  return <DesignSystemPreview />;
}
