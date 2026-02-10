import { prisma } from "@/lib/db";

export async function getLandingData(locale: string) {
  const [projects, skills, testimonials, experiences, hobbies, resume] = await Promise.all([
    prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        titleEn: true,
        titleFr: true,
        descriptionEn: true,
        descriptionFr: true,
        techStack: true,
        githubLink: true,
        liveLink: true,
        projectStartDate: true,
        projectEndDate: true,
        isActive: true,
      },
    }),
    prisma.skill.findMany({
      orderBy: { order: "asc" },
      select: { id: true, nameEn: true, nameFr: true, category: true },
    }),
    prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
      select: { id: true, authorName: true, authorRole: true, contentEn: true, contentFr: true },
    }),
    prisma.experience.findMany({
      orderBy: [{ endDate: "desc" }, { startDate: "desc" }],
    }),
    prisma.hobby.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.resume.findFirst({
      where: { locale },
      orderBy: { uploadedAt: "desc" },
    }),
  ]);

  return { projects, skills, testimonials, experiences, hobbies, resume };
}
