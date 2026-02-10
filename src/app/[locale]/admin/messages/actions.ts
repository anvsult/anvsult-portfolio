'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export async function deleteMessage(id: string) {
  await requireUser();
  const locale = await getLocale();
  await prisma.message.delete({ where: { id } });
  revalidatePath(`/${locale}/admin/messages`);
  redirect(`/${locale}/admin/messages?toast=deleted`);
}

export async function markAsRead(id: string) {
  await requireUser();
  const locale = await getLocale();
  await prisma.message.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath(`/${locale}/admin/messages`);
  redirect(`/${locale}/admin/messages?toast=read`);
}
