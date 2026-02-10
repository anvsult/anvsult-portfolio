'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export async function addHobby(formData: FormData) {
  await requireUser();
  const locale = await getLocale();
  const nameEn = formData.get("nameEn") as string;
  const nameFr = formData.get("nameFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const iconName = formData.get("iconName") as string;

  try {
    await prisma.hobby.create({
      data: {
        nameEn,
        nameFr,
        descriptionEn,
        descriptionFr,
        iconName,
      },
    });
    revalidatePath(`/${locale}/admin/hobbies`);
    revalidatePath(`/${locale}`);
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function deleteHobby(id: string) {
  await requireUser();
  const locale = await getLocale();
  try {
    await prisma.hobby.delete({ where: { id } });
    revalidatePath(`/${locale}/admin/hobbies`);
    revalidatePath(`/${locale}`);
    redirect(`/${locale}/admin/hobbies?toast=deleted`);
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function updateHobby(formData: FormData) {
  await requireUser();
  const locale = await getLocale();
  const id = formData.get("id") as string;
  const nameEn = formData.get("nameEn") as string;
  const nameFr = formData.get("nameFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const iconName = formData.get("iconName") as string;

  if (!id) {
    return { error: "Missing hobby id." };
  }

  try {
    await prisma.hobby.update({
      where: { id },
      data: {
        nameEn,
        nameFr,
        descriptionEn,
        descriptionFr,
        iconName,
      },
    });
    revalidatePath(`/${locale}/admin/hobbies`);
    revalidatePath(`/${locale}`);
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}
