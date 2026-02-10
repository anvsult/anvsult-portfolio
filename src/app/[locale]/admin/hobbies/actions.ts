'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addHobby(formData: FormData) {
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
    revalidatePath("/[locale]/admin/hobbies");
    revalidatePath("/[locale]");
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function deleteHobby(id: string) {
  try {
    await prisma.hobby.delete({ where: { id } });
    revalidatePath("/[locale]/admin/hobbies");
    revalidatePath("/[locale]");
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function updateHobby(formData: FormData) {
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
    revalidatePath("/[locale]/admin/hobbies");
    revalidatePath("/[locale]");
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}
