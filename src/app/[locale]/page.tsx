import { getLocale } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillCard } from '@/components/portfolio/SkillCard';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default async function LandingPage() {
  const locale = await getLocale();

  // Fetch projects using your 'prisma' instance
  const projects = await prisma.project.findMany({
    where: { isFeatured: true },
    orderBy: { order: 'asc' },
    take: 3
  });

  const skills = await prisma.skill.findMany({
    orderBy: { proficiency: 'desc' }
  })

  // // Optional: Grouping by category
  // const frontendSkills = skills.filter(s => s.category === 'Frontend');
  // const backendSkills = skills.filter(s => s.category === 'Backend');

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold tracking-tight">Anvar Sultanov</h1>
        <p className="text-xl text-muted-foreground">
          {locale === 'en' 
            ? 'Software Development Student @ Champlain College' 
            : 'Étudiant en Développement Logiciel @ Collège Champlain'}
        </p>
        <ModeToggle />
      </section>

      {/* Projects Grid */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold mb-8">
          {locale === 'en' ? 'Featured Projects' : 'Projets Vedettes'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                title={locale === 'en' ? project.titleEn : project.titleFr}
                description={locale === 'en' ? project.descriptionEn : project.descriptionFr}
                techStack={project.techStack}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">
              {locale === 'en' ? 'No projects added yet.' : 'Aucun projet ajouté pour le moment.'}
            </p>
          )}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold mb-8">
          {/* TODO Use translations */}
          {locale === 'en' ? 'Skills' : 'Compétences'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                index={index}
                name={locale === 'en' ? skill.nameEn : skill.nameFr}
                category={skill.category}
                proficiency={skill.proficiency}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">
              {locale === 'en' ? 'No skills added yet.' : 'Aucune compétence ajoutée pour le moment.'}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}