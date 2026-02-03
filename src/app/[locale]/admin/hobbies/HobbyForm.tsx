'use client'

import { addHobby } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import * as Icons from 'lucide-react';

type LucideIconName = keyof typeof Icons;

export function HobbyForm() {
  const [loading, setLoading] = useState(false);
  const [iconName, setIconName] = useState('');
  const Icon = iconName && Icons[iconName as LucideIconName] ? Icons[iconName as LucideIconName] : null;

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await addHobby(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Hobby added!");
      (document.getElementById("hobby-form") as HTMLFormElement).reset();
      setIconName('');
    } else {
      toast.error("Error", { description: res.error });
    }
  }

  return (
    <form id="hobby-form" action={handleAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="nameEn" placeholder="Name (English)" required />
        <Input name="nameFr" placeholder="Name (French)" required />
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
      <Textarea name="descriptionEn" placeholder="Description (English)" />
      <Textarea name="descriptionFr" placeholder="Description (French)" />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Hobby"}
      </Button>
    </form>
  );
}
