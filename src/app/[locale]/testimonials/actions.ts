'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { testimonialSchema } from "@/lib/schemas";

export async function submitTestimonial(formData: FormData) {
  const authorName = formData.get("authorName") as string;
  const authorRole = formData.get("authorRole") as string;
  const contentEn = formData.get("contentEn") as string;
  const website = formData.get("website") as string | null;
  if (website) return { error: "Something went wrong." };

  const validationResult = testimonialSchema.safeParse({
    authorName,
    authorRole,
    contentEn,
    contentFr: formData.get("contentFr") as string || undefined,
  });

  if (!validationResult.success) {
    return {
      error: "Validation failed. Please check your input.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { contentFr } = validationResult.data;

  try {
    await prisma.testimonial.create({
      data: {
        authorName,
        authorRole,
        contentEn,
        contentFr: contentFr || contentEn,
        isApproved: false, // Ensures it goes to your Admin Moderation first!
      }
    });
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}
