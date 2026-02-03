'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addExperience(formData: FormData) {
  const companyEn = formData.get("companyEn") as string;
  const companyFr = formData.get("companyFr") as string;
  const positionEn = formData.get("positionEn") as string;
  const positionFr = formData.get("positionFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
  const location = formData.get("location") as string;
  const technologies = (formData.get("technologies") as string).split(',').map(t => t.trim());

  const lastExperience = await prisma.experience.findFirst({
    orderBy: { order: 'desc' }
  });
  const order = lastExperience ? lastExperience.order + 1 : 0;

  try {
    await prisma.experience.create({
      data: {
        companyEn,
        companyFr,
        positionEn,
        positionFr,
        descriptionEn,
        descriptionFr,
        startDate,
        endDate,
        location,
        technologies,
        order,
      },
    });
    revalidatePath("/[locale]/admin/experience");
    revalidatePath("/[locale]");
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/[locale]/admin/experience");
    revalidatePath("/[locale]");
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

export async function moveExperienceUp(id: string, order: number) {
  if (order === 0) return;
  await prisma.$transaction([
    prisma.experience.updateMany({
      where: { order: order - 1 },
      data: { order: order }
    }),
    prisma.experience.update({
      where: { id },
      data: { order: order - 1 }
    })
  ]);
  revalidatePath("/[locale]/admin/experience");
}

export async function moveExperienceDown(id: string, order: number) {
  await prisma.$transaction([
    prisma.experience.updateMany({
      where: { order: order + 1 },
      data: { order: order }
    }),
    prisma.experience.update({
      where: { id },
      data: { order: order + 1 }
    })
  ]);
  revalidatePath("/[locale]/admin/experience");
}
