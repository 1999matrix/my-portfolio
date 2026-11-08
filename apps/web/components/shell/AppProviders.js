"use client";

import { LayoutGroup, LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { PageIntro } from "@/components/shell/PageIntro.js";

/**
 * @param {{ children: React.ReactNode; introLine?: string | null }} props
 */
export function AppProviders({ children, introLine = null }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <LayoutGroup id="control-plane">
          <PageIntro introLine={introLine} />
          {children}
        </LayoutGroup>
      </MotionConfig>
    </LazyMotion>
  );
}
