'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getLocale } from "next-intl/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProject(formData: FormData) {
  await requireUser();
  const locale = await getLocale();
  // Extract data from form
  const titleEn = formData.get("titleEn") as string;
  const titleFr = formData.get("titleFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const techStackString = formData.get("techStack") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const imageUrl = formData.get("imageUrl") as string | null;

  const projectStartDateRaw = formData.get("projectStartDate") as string;
  const projectEndDateRaw = formData.get("projectEndDate") as string | null;
  const projectStartDate = projectStartDateRaw ? new Date(projectStartDateRaw) : new Date();
  const projectEndDate = projectEndDateRaw ? new Date(projectEndDateRaw) : null;

  // Basic validation
  if (!titleEn || !titleFr) throw new Error("Titles are required");

  // Create the project in the database
  let baseSlug = slugify(titleEn);
  if (!baseSlug) {
    baseSlug = `project-${Date.now()}`;
  }
  const existing = await prisma.project.findFirst({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

  await prisma.project.create({
    data: {
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
      slug,
      techStack: techStackString.split(",").map(s => s.trim()),
      imageUrl,
      githubLink,
      liveLink,
      isFeatured,
      projectStartDate,
      projectEndDate,
    },
  });

  // Clear the cache so the public portfolio updates immediately
  revalidatePath(`/${locale}/admin/projects`, "layout");
  revalidatePath(`/${locale}/projects`, "layout");

  redirect(`/${locale}/admin/projects?toast=created`);
}

export async function deleteProject(id: string) {
  await requireUser();
  const locale = await getLocale();
  await prisma.project.delete({ where: { id } });
  revalidatePath(`/${locale}/admin/projects`, "layout");
  revalidatePath(`/${locale}/projects`, "layout");
  redirect(`/${locale}/admin/projects?toast=deleted`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireUser();
  const locale = await getLocale();
  const titleEn = formData.get("titleEn") as string;
  const titleFr = formData.get("titleFr") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionFr = formData.get("descriptionFr") as string;
  const techStackString = formData.get("techStack") as string;
  const githubLink = formData.get("githubLink") as string;
  const liveLink = formData.get("liveLink") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const imageUrl = formData.get("imageUrl") as string | null;

  const projectStartDateRaw = formData.get("projectStartDate") as string;
  const projectEndDateRaw = formData.get("projectEndDate") as string | null;
  const projectStartDate = projectStartDateRaw ? new Date(projectStartDateRaw) : undefined;
  const projectEndDate = projectEndDateRaw ? new Date(projectEndDateRaw) : null;

  if (!titleEn || !titleFr) throw new Error("Titles are required");

  const baseSlug = slugify(titleEn);
  const existing = await prisma.project.findFirst({ where: { slug: baseSlug, NOT: { id } } });
  const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

  await prisma.project.update({
    where: { id },
    data: {
      titleEn,
      titleFr,
      descriptionEn,
      descriptionFr,
      slug,
      techStack: techStackString ? techStackString.split(",").map(s => s.trim()) : [],
      imageUrl,
      githubLink,
      liveLink,
      isFeatured,
      projectStartDate,
      projectEndDate,
    },
  });

  revalidatePath(`/${locale}/admin/projects`, "layout");
  revalidatePath(`/${locale}/projects`, "layout");
  redirect(`/${locale}/admin/projects?toast=updated`);
}
