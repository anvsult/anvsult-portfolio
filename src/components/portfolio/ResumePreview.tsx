'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { toast } from 'sonner';
import { Loader2, AlertTriangle } from 'lucide-react';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface ResumePreviewProps {
  fileUrl: string;
}

export function ResumePreview({ fileUrl }: ResumePreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error): void {
    toast.error('Error loading resume', {
      description: error.message,
    });
  }

  return (
    <div className="w-full h-96 rounded-lg bg-black/20 flex items-center justify-center overflow-hidden">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading Preview...</span>
          </div>
        }
        error={
            <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle size={20} />
                <span>Error loading preview</span>
            </div>
        }
      >
        <Page pageNumber={1} width={320} />
      </Document>
    </div>
  );
}
