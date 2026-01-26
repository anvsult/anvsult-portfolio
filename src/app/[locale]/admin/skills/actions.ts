'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSkill(formData: FormData) {
  const nameEn = formData.get("nameEn") as string;
  const nameFr = formData.get("nameFr") as string;
  const category = formData.get("category") as string;
  const proficiency = parseInt(formData.get("proficiency") as string) || 80;

  await prisma.skill.create({
    data: {
      nameEn,
      nameFr,
      category,
      proficiency,
      order: 0,
    },
  });

  revalidatePath("/[locale]/admin/skills");
  revalidatePath("/[locale]");
}