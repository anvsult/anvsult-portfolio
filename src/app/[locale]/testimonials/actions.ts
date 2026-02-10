'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitTestimonial(formData: FormData) {
  const authorName = formData.get("authorName") as string;
  const authorRole = formData.get("authorRole") as string;
  const contentEn = formData.get("contentEn") as string;
  const website = formData.get("website") as string | null;
  if (website) return { error: "Something went wrong." };
  // If they don't provide French, we default to English for both
  const contentFr = (formData.get("contentFr") as string) || contentEn;

  if (!authorName || !contentEn) return { error: "Required fields missing" };

  try {
    await prisma.testimonial.create({
      data: {
        authorName,
        authorRole,
        contentEn,
        contentFr,
        isApproved: false, // Ensures it goes to your Admin Moderation first!
      }
    });
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}
