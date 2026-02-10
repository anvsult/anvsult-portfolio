'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const website = formData.get("website") as string | null;

  if (website) {
    return { error: "Failed to send message. Please try again." };
  }

  if (!name || !email || !content) {
    return { error: "Please fill in all required fields." };
  }

  try {
    await prisma.message.create({
      data: { name, email, subject, content },
    });

    revalidatePath("/admin/messages"); // Update admin view
    return { success: true };
  } catch (e) {
    return { error: "Failed to send message. Please try again." };
  }
}
