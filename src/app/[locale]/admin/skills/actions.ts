'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export async function createSkill(formData: FormData) {
  await requireUser();
  const locale = await getLocale();
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

  revalidatePath(`/${locale}/admin/skills`);
  revalidatePath(`/${locale}`);
}

export async function deleteSkill(id: string) {
  await requireUser();
  const locale = await getLocale();
  if (!id) return;

  await prisma.skill.delete({
    where: { id },
  });

  revalidatePath(`/${locale}/admin/skills`);
  revalidatePath(`/${locale}`);
  redirect(`/${locale}/admin/skills?toast=deleted`);
}
