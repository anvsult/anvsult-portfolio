'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export async function approveTestimonial(id: string) {
  await requireUser();
  const locale = await getLocale();
  await prisma.testimonial.update({
    where: { id },
    data: { isApproved: true }
  });
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/testimonials`);
  redirect(`/${locale}/admin/testimonials?toast=approved`);
}

export async function deleteTestimonial(id: string) {
  await requireUser();
  const locale = await getLocale();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath(`/${locale}/admin/testimonials`);
  redirect(`/${locale}/admin/testimonials?toast=deleted`);
}
