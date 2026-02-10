'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSkill(formData: FormData) {
  const nameEn = formData.get("nameEn") as string;
  const nameFr = formData.get("nameFr") as string;
  const category = formData.get("category") as string;

  await prisma.skill.create({
    data: {
      nameEn,
      nameFr,
      category,
      order: 0,
    },
  });

  revalidatePath("/[locale]/admin/skills");
  revalidatePath("/[locale]");
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.skill.delete({
    where: { id },
  });

  revalidatePath("/[locale]/admin/skills");
  revalidatePath("/[locale]");
}