'use client';

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DownloadCloud } from "lucide-react";

interface ResumeDownloaderProps {
  fileUrl: string;
  fileName: string;
}

export function ResumeDownloader({ fileUrl, fileName }: ResumeDownloaderProps) {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show a toast notification
    toast.success("Thank you for your interest!", {
      description: `Downloading ${fileName}...`,
      icon: <DownloadCloud size={16} />,
    });
  };

  return (
    <Button onClick={handleDownload} className="mt-4 gap-2">
      <DownloadCloud size={16} />
      Download Resume
    </Button>
  );
}
