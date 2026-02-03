'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function approveTestimonial(id: string) {
  await prisma.testimonial.update({
    where: { id },
    data: { isApproved: true }
  });
  revalidatePath("/[locale]");
  revalidatePath("/[locale]/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/[locale]/admin/testimonials");
}