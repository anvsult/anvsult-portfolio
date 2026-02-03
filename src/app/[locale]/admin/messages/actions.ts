'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export async function markAsRead(id: string) {
  await prisma.message.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath("/admin/messages");
}