'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export type UpdateResumeState = {
  message?: string;
  error?: string;
};

export async function updateResume(
  prevState: UpdateResumeState,
  formData: FormData
): Promise<UpdateResumeState> {
  await requireUser();
  const currentLocale = await getLocale();

  const locale = formData.get("locale") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const fileName = formData.get("fileName") as string;
  const version = formData.get("version") as string;

  if (!locale || !fileUrl || !fileName) {
    return { error: "Missing required fields" };
  }

  try {
    // Check if resume entry exists for this locale
    const existing = await prisma.resume.findFirst({
      where: { locale },
    });

    if (existing) {
      await prisma.resume.update({
        where: { id: existing.id },
        data: {
          fileUrl,
          fileName,
          version: version || "1.0",
          uploadedAt: new Date(),
        },
      });
    } else {
      await prisma.resume.create({
        data: {
          locale,
          fileUrl,
          fileName,
          version: version || "1.0",
        },
      });
    }

    revalidatePath(`/${currentLocale}/admin/resume`);
    revalidatePath(`/${currentLocale}`, "layout");

    return { message: "Resume updated successfully" };
  } catch (error) {
    console.error("Failed to update resume:", error);
    return { error: "Failed to update database" };
  }
}
