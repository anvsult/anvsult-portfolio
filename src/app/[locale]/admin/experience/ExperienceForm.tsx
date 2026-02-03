'use client'

import { addExperience } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export function ExperienceForm() {
  const [loading, setLoading] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await addExperience(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Experience added!");
      (document.getElementById("experience-form") as HTMLFormElement).reset();
    } else {
      toast.error("Error", { description: res.error });
    }
  }

  return (
    <form id="experience-form" action={handleAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="companyEn" placeholder="Company (English)" required />
        <Input name="companyFr" placeholder="Company (French)" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input name="positionEn" placeholder="Position (English)" required />
        <Input name="positionFr" placeholder="Position (French)" required />
      </div>
      <Input name="location" placeholder="Location" />
      <div className="grid grid-cols-2 gap-4">
        <Input name="startDate" type="date" required />
        <Input name="endDate" type="date" />
      </div>
      <Input name="technologies" placeholder="Technologies (comma-separated)" />
      <Textarea name="descriptionEn" placeholder="Description (English)" />
      <Textarea name="descriptionFr" placeholder="Description (French)" />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Experience"}
      </Button>
    </form>
  );
}
