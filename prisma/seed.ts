import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.experience.createMany({
    data: [
      {
        companyEn: 'Company A',
        companyFr: 'Entreprise A',
        positionEn: 'Software Engineer',
        positionFr: 'Ingénieur Logiciel',
        descriptionEn: "Worked on the company's main product, a web application for project management.",
        descriptionFr: "Travaillé sur le produit principal de l'entreprise, une application web pour la gestion de projet.",
        startDate: new Date('2022-01-01'),
        endDate: null,
        location: 'Montreal, QC',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        order: 0,
      },
      {
        companyEn: 'Company B',
        companyFr: 'Entreprise B',
        positionEn: 'Frontend Developer',
        positionFr: 'Développeur Frontend',
        descriptionEn: "Developed and maintained the company's e-commerce website.",
        descriptionFr: "Développé et maintenu le site e-commerce de l'entreprise.",
        startDate: new Date('2021-01-01'),
        endDate: new Date('2021-12-31'),
        location: 'Quebec City, QC',
        technologies: ['Vue.js', 'Nuxt.js', 'Stripe'],
        order: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
