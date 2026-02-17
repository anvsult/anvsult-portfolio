"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Upload, ImageIcon, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type ImageUploadProps = {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  bucket?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = "Project Image",
  bucket = process.env.NEXT_PUBLIC_PROJECTS_BUCKET || "projects"
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Auto-upload
      setUploading(true);
      try {
        const supabase = createClient();

        // Debug
        const { data: { user } } = await supabase.auth.getUser();
        console.log("ImageUpload: Uploading as User:", user?.id);

        // Sanitize filename
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        // Note: For projects, we might want to organize by project ID, but for new projects we don't have one yet.
        // A flat structure or date-based folder is fine.

        console.log(`ImageUpload: Uploading to bucket '${bucket}' path '${filePath}'`);

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, selectedFile);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        setPreview(publicUrl);
        onChange(publicUrl);
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        console.error("ImageUpload Error:", error);
        toast.error(`Upload failed: ${error.message || "Unknown error"}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    onChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {preview && (
          <Button variant="ghost" size="sm" onClick={handleRemove} className="text-destructive h-8 px-2">
            <X className="mr-2 h-4 w-4" /> Remove
          </Button>
        )}
      </div>

      {!preview ? (
        <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2 pointer-events-none">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
            )}
            <div className="text-sm font-medium">
              {uploading ? "Uploading..." : "Drag & drop or click to upload"}
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, WEBP up to 5MB
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border aspect-video w-full max-w-sm bg-muted">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Hidden input to store URL for form submission if needed, 
          but usually we pass it via state in the parent form */}
    </div>
  );
}
