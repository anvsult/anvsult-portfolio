'use client';

import dynamic from 'next/dynamic';
import { SkeletonShimmer } from "@/components/motion/SkeletonShimmer";

const ResumePreview = dynamic(
  () => import('@/components/portfolio/ResumePreview').then((m) => m.ResumePreview),
  {
    ssr: false,
    loading: () => <SkeletonShimmer className="h-96 rounded-lg" />,
  }
);

export function ResumePreviewClient({ fileUrl }: { fileUrl: string }) {
  return <ResumePreview fileUrl={fileUrl} />;
}
