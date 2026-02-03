import { getLocale } from 'next-intl/server';
import { prisma } from '@/lib/db';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SkillCard } from '@/components/portfolio/SkillCard';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ContactForm } from '@/components/portfolio/ContactForm';
import { TestimonialCard } from '@/components/portfolio/TestimonialCard';
import { Card, CardContent } from "@/components/ui/card";
import { ResumePreview } from "@/components/portfolio/ResumePreview";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { TestimonialForm } from '@/components/portfolio/TestimonialForm';
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/portfolio/Timeline';
import { HobbyCard } from '@/components/portfolio/HobbyCard';
import { ResumeDownloader } from '@/components/portfolio/ResumeDownloader';

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

  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: 'desc' }
  });

  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  const hobbies = await prisma.hobby.findMany({
    orderBy: { order: 'asc' }
  });

  const resume = await prisma.resume.findFirst({
    where: { locale: locale },
    orderBy: { uploadedAt: 'desc' }
  });


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

      {/* Experience Timeline */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          {locale === 'en' ? 'My Journey' : 'Mon Parcours'}
        </h2>
        <Timeline experiences={experiences} locale={locale} />
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



      



            {/* Hobbies Bento Grid */}



            <section className="mt-20">



              <h2 className="text-3xl font-semibold mb-8 text-center">



                {locale === 'en' ? 'Lifestyle Stack' : 'Mes Passions'}



              </h2>



              <div className="grid grid-cols-5 grid-rows-2 gap-4 min-h-[300px]">
                {hobbies.map((hobby, index) => (
                  <HobbyCard
                    key={hobby.id}
                    index={index}
                    name={locale === 'en' ? hobby.nameEn : hobby.nameFr}
                    description={locale === 'en' ? hobby.descriptionEn : hobby.descriptionFr}
                    iconName={hobby.iconName}
                    className={
                      index === 0 ? 'col-span-2 row-span-1' :
                      index === 3 ? 'col-span-2 row-span-1' : ''
                    }
                  />
                ))}
              </div>



            </section>



      



            {/* Testimonials Section */}



            <section className="mt-20">



      

        <h2 className="text-3xl font-semibold mb-8 text-center">

          {locale === 'en' ? 'What Others Say' : 'Ce que les autres disent'}

        </h2>



        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {testimonials.map((t, index) => (

            <div key={t.id} className="break-inside-avoid">

              <TestimonialCard

                index={index}

                name={t.authorName}

                role={t.authorRole}

                content={locale === 'en' ? t.contentEn : t.contentFr}

              />

            </div>

          ))}

        </div>



        <div className="mt-12 text-center">

          <Dialog>

            <DialogTrigger asChild>

              <Button variant="outline">

                {locale === 'en' ? 'Leave a Testimonial' : 'Laisser un témoignage'}

              </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">

              <DialogHeader>

                <DialogTitle>Leave a Testimonial</DialogTitle>

                <DialogDescription>

                  Thank you for your feedback! It will appear on the site after a quick review.

                </DialogDescription>

              </DialogHeader>

              <TestimonialForm />

            </DialogContent>

          </Dialog>

        </div>

      </section>







      <section className="mt-20">



        <h2 className="text-3xl font-semibold mb-8 text-center">



          {locale === 'en' ? 'My Resume' : 'Mon CV'}



        </h2>



        <Card className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5">



          <CardContent>



            {resume ? (



              <div className="flex flex-col md:flex-row gap-8 items-center">



                <div className="flex-1">



                  <h3 className="text-2xl font-bold">{resume.fileName}</h3>



                  <p className="text-muted-foreground mt-2">



                    {locale === 'en' ? 'Latest Version' : 'Dernière Version'}: {resume.version}



                  </p>



                  <ResumeDownloader fileUrl={resume.fileUrl} fileName={resume.fileName} />



                </div>



                <div className="flex-1">



                  <ResumePreview fileUrl={resume.fileUrl} />



                </div>



              </div>



            ) : (



              <p className="text-center text-muted-foreground">



                {locale === 'en' ? 'Resume not available yet.' : 'CV pas encore disponible.'}



              </p>



            )}



          </CardContent>



        </Card>



      </section>







      {/* Contact Section */}



      <section className="mt-32 max-w-2xl mx-auto">



        <h2 className="text-3xl font-bold mb-8 text-center">



          {locale === 'en' ? 'Get in Touch' : 'Contactez-moi'}



        </h2>



        <ContactForm />



      </section>



    </main>



  );



}





