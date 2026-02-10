import { cn } from "@/lib/utils";

type SkeletonShimmerProps = {
  className?: string;
};

export function SkeletonShimmer({ className }: SkeletonShimmerProps) {
  return <div className={cn("skeleton-shimmer", className)} />;
}
