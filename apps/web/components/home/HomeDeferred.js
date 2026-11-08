"use client";

import dynamic from "next/dynamic";

export const DeferredNetworkHero = dynamic(
  () => import("@/components/hero/NetworkHero.js").then((mod) => mod.NetworkHero),
  { ssr: false },
);
