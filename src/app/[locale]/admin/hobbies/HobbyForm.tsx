'use client'

import { addHobby, updateHobby } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import * as Icons from 'lucide-react';

type LucideIconName = keyof typeof Icons;

export type HobbyFormInitial = {
  id?: string;
  nameEn?: string;
  nameFr?: string;
  descriptionEn?: string | null;
  descriptionFr?: string | null;
  iconName?: string | null;
};

type HobbyFormProps = {
  initial?: HobbyFormInitial;
  submitLabel?: string;
  onSuccess?: () => void;
};

export function HobbyForm({ initial, submitLabel, onSuccess }: HobbyFormProps) {
  const [loading, setLoading] = useState(false);
  const [iconName, setIconName] = useState(initial?.iconName ?? '');
  const Icon = iconName && Icons[iconName as LucideIconName] ? Icons[iconName as LucideIconName] : null;
  const isEdit = Boolean(initial?.id);

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = isEdit ? await updateHobby(formData) : await addHobby(formData);
    setLoading(false);

    if (res.success) {
      toast.success(isEdit ? "Hobby updated!" : "Hobby added!");
      if (!isEdit) {
        (document.getElementById("hobby-form") as HTMLFormElement).reset();
        setIconName('');
      }
      onSuccess?.();
    } else {
      toast.error("Error", { description: res.error });
    }
  }

  return (
    <form id="hobby-form" action={handleAction} className="space-y-4">
      {isEdit && <input type="hidden" name="id" value={initial?.id} />}
      <div className="grid grid-cols-2 gap-4">
        <Input name="nameEn" placeholder="Name (English)" defaultValue={initial?.nameEn ?? ''} required />
        <Input name="nameFr" placeholder="Name (French)" defaultValue={initial?.nameFr ?? ''} required />
      </div>
      <div className="relative">
        <Input 
          name="iconName" 
          placeholder="Lucide Icon Name (e.g. Music, Code)" 
          required 
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
        />
        {Icon && <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />}
      </div>
      <Textarea name="descriptionEn" placeholder="Description (English)" defaultValue={initial?.descriptionEn ?? ''} />
      <Textarea name="descriptionFr" placeholder="Description (French)" defaultValue={initial?.descriptionFr ?? ''} />
      <Button type="submit" disabled={loading}>
        {loading ? (isEdit ? "Saving..." : "Adding...") : (submitLabel ?? (isEdit ? "Save Changes" : "Add Hobby"))}
      </Button>
    </form>
  );
}
