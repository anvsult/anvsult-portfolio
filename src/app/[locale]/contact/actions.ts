'use server'

import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/mail"; // Changed from sendMail to sendContactEmail as per previous steps
import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/schemas";
import { getTranslations } from "next-intl/server";

export async function sendMessage(formData: FormData) {
  const t = await getTranslations('Contact');

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  // Server-side validation
  const validationResult = contactFormSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: t('serverValidationError'), details: validationResult.error.flatten() };
  }

  const { name, email, subject, message } = validationResult.data;

  // Rate limiting
  const ip = (await headers()).get("x-forwarded-for") || "unknown";
  const rateLimitResult = await checkRateLimit(ip);
  if (rateLimitResult.error) {
    return { error: rateLimitResult.error };
  }

  try {
    const mailResult = await sendContactEmail({ name, email, subject, message });

    if (mailResult?.error) {
      return { error: mailResult.error };
    }

    return { success: true };
  } catch (e) {
    console.error("Failed to submit contact form:", e);
    return { error: t('sendingError') };
  }
}
