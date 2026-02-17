'use server'

import { checkRateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mail";
import { headers } from "next/headers";

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const website = formData.get("website") as string | null;

  if (website) {
    // Honey pot trap
    return { error: "Failed to send message. Please try again." };
  }

  if (!name || !email || !content) {
    return { error: "Please fill in all required fields." };
  }

  // Rate limiting
  const ip = (await headers()).get("x-forwarded-for") || "unknown";
  const rateLimitResult = await checkRateLimit(ip);
  if (rateLimitResult.error) {
    return { error: rateLimitResult.error };
  }

  try {
    const mailResult = await sendMail({ name, email, subject, content });

    if (mailResult.error) {
      return { error: mailResult.error };
    }

    return { success: true };
  } catch (e) {
    return { error: "Failed to send message. Please try again." };
  }
}
