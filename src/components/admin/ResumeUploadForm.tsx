"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Upload, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { updateResume } from "@/app/[locale]/admin/resume/actions";
import { useFormStatus } from "react-dom";

// Helper for submit button
function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}

type ResumeUploadFormProps = {
  locale: string;
  label: string;
  existingResume?: {
    fileUrl: string;
    fileName: string;
    version: string;
    uploadedAt: Date;
  } | null;
};

export function ResumeUploadForm({ locale, label, existingResume }: ResumeUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(existingResume?.fileUrl || "");
  const [fileName, setFileName] = useState(existingResume?.fileName || "");

  // We wrap the server action to handle the result
  const [state, formAction] = useActionState(updateResume, {});

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Auto-upload to bucket
      setUploading(true);
      try {
        const supabase = createClient();

        // Debug: Log user and bucket
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) console.error("Auth Error:", userError);
        console.log("Uploading as User:", user?.id);

        const bucketName = process.env.NEXT_PUBLIC_RESUME_BUCKET || 'resumes';
        console.log("Using Bucket:", bucketName);

        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `${locale}/${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, selectedFile);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        setFileUrl(publicUrl);
        setFileName(selectedFile.name);
        toast.success("File uploaded to storage");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload file to storage");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="fileUrl" value={fileUrl} />
      <input type="hidden" name="fileName" value={fileName} />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{label}</h3>
          {existingResume && (
            <p className="text-sm text-muted-foreground">
              Current: {existingResume.fileName} (v{existingResume.version})
              <br />
              Updated: {new Date(existingResume.uploadedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        {existingResume && (
          <Button variant="outline" size="sm" asChild>
            <a href={existingResume.fileUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" /> View
            </a>
          </Button>
        )}
      </div>

      <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={`file-${locale}`}>Upload New PDF</Label>
          <Input
            id={`file-${locale}`}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading && <p className="text-xs text-muted-foreground animate-pulse">Uploading to cloud...</p>}
          {file && !uploading && <p className="text-xs text-green-600 flex items-center"><CheckCircle2 className="h-3 w-3 mr-1" /> Ready to save</p>}
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={`version-${locale}`}>Version</Label>
          <Input
            id={`version-${locale}`}
            name="version"
            defaultValue={existingResume?.version || "1.0"}
            placeholder="e.g. 2.0"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>

      {state.message && <p className="text-green-600 text-sm">{state.message}</p>}
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  );
}
