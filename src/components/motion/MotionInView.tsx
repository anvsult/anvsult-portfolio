'use client';

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type MotionInViewProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export function MotionInView({ children, className, ...props }: MotionInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, render the content without
  // entrance/hover animations. Keep layout/styling intact.
  const safeProps: MotionProps = shouldReduceMotion
    ? {
        ...props,
        initial: false,
        animate: undefined,
        whileInView: undefined,
        whileHover: undefined,
        whileTap: undefined,
        transition: undefined,
        viewport: undefined,
      }
    : props;

  return (
    <motion.div className={className} {...safeProps}>
      {children}
    </motion.div>
  );
}
