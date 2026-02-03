'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  // Extract data from form
  const titleEn = formData.get("titleEn") as string;
  const titleFr = formData.get("titleFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const techStackString = formData.get("techStack") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  // Basic validation
  if (!titleEn || !titleFr) throw new Error("Titles are required");

  // Create the project in the database
  await prisma.project.create({
    data: {
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
      slug: titleEn.toLowerCase().replace(/ /g, "-"),
      techStack: techStackString.split(",").map(s => s.trim()), // "React, Next" -> ["React", "Next"]
      githubLink,
      liveLink,
      isFeatured,
    },
  });

  // Clear the cache so the public portfolio updates immediately
  revalidatePath("/[locale]/admin/projects", "layout");
  revalidatePath("/[locale]/projects", "layout");
  
  redirect("/[locale]/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/[locale]/admin/projects", "layout");
  revalidatePath("/[locale]/projects", "layout");
}