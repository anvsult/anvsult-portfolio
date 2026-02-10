import { getLocale } from 'next-intl/server';
import { getLandingData } from '@/lib/portfolio';
import { ContactForm } from '@/components/portfolio/ContactForm';
import { TestimonialWall } from '@/components/portfolio/TestimonialWall';
import { Card, CardContent } from "@/components/ui/card";
import { ResumePreviewClient } from "@/components/portfolio/ResumePreviewClient";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";

import { TestimonialDialog } from '@/components/portfolio/TestimonialDialog';
import { Timeline } from '@/components/portfolio/Timeline';
import { HobbyCard } from '@/components/portfolio/HobbyCard';
import { ResumeDownloader } from '@/components/portfolio/ResumeDownloader';
import { BottomNav } from '@/components/portfolio/BottomNav';
import { Marquee } from "@/components/motion/Marquee";
import { FeaturedProjectsTimeline } from "@/components/portfolio/FeaturedProjectsTimeline";


export default async function LandingPage() {
  const locale = await getLocale();

  const { projects, skills, testimonials, experiences, hobbies, resume } = await getLandingData(locale);


  // // Optional: Grouping by category
  // const frontendSkills = skills.filter(s => s.category === 'Frontend');
  // const backendSkills = skills.filter(s => s.category === 'Backend');

  const skillLabels = skills.map((skill) => (locale === 'en' ? skill.nameEn : skill.nameFr));

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
      {/* Hero Section */}
      <section id="top" className="text-center space-y-4 py-12 scroll-mt-24">
        <h1 className="text-5xl font-bold tracking-tight">Anvar Sultanov</h1>
        <p className="text-xl text-muted-foreground">
          {locale === 'en'
            ? 'Software Development Student @ Champlain College'
            : 'Étudiant en Développement Logiciel @ Collège Champlain'}
        </p>
      </section>

      {/* Projects Gallery */}
      <section id="projects" className="mt-20 scroll-mt-24">
        <h2 className="text-3xl font-semibold mb-8">
          {locale === 'en' ? 'Featured Projects' : 'Projets Vedettes'}
        </h2>
        <FeaturedProjectsTimeline
        projects={projects.map((project) => ({
          id: project.id,
          title: project.titleEn,
          techStack: project.techStack,
          projectStartDate: project.projectStartDate,
          projectEndDate: project.projectEndDate,
          isActive: project.isActive,
        }))}
      />
      </section>

      {/* Experience Timeline */}
      <section id="journey" className="mt-20 scroll-mt-24">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          {locale === 'en' ? 'My Journey' : 'Mon Parcours'}
        </h2>
        <Timeline experiences={experiences} locale={locale} />
      </section>

      {/* Skills Grid */}
      <section id="skills" className="mt-20 scroll-mt-24">
        <h2 className="text-3xl font-semibold mb-8">
          {/* TODO Use translations */}
          {locale === 'en' ? 'Skills' : 'Compétences'}
        </h2>

        <Marquee
          items={skillLabels}
          className="mb-8"
          itemClassName="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide"
          duration={24}
        />

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                index={index}
                name={locale === 'en' ? skill.nameEn : skill.nameFr}
                category={skill.category}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">
              {locale === 'en' ? 'No skills added yet.' : 'Aucune compétence ajoutée pour le moment.'}
            </p>
          )}
        </div> */}
      </section>



      



            {/* Hobbies Bento Grid */}



            <section id="hobbies" className="mt-20 scroll-mt-24">



              <h2 className="text-3xl font-semibold mb-8 text-center">



                {locale === 'en' ? 'Lifestyle Stack' : 'Mes Passions'}



              </h2>



              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[300px]">
                {hobbies.map((hobby, index) => (
                  <HobbyCard
                    key={hobby.id}
                    index={index}
                    name={locale === 'en' ? hobby.nameEn : hobby.nameFr}
                    description={locale === 'en' ? hobby.descriptionEn : hobby.descriptionFr}
                    iconName={hobby.iconName}
                    className={
                      'col-span-1 row-span-1'
                    }
                    // className={
                    //   index === 0 ? 'col-span-2 row-span-1' :
                    //   index === 3 ? 'col-span-2 row-span-1' : ''
                    // }
                  />
                ))}
              </div>



            </section>



      



            {/* Testimonials Section */}



            <section id="testimonials" className="mt-20 scroll-mt-24">



      

        <h2 className="text-3xl font-semibold mb-8 text-center">

          {locale === 'en' ? 'What Others Say' : 'Ce que les autres disent'}

        </h2>



        <TestimonialWall testimonials={testimonials} locale={locale} />



        <div className="mt-12 text-center">
          <TestimonialDialog
            buttonLabel={locale === 'en' ? 'Leave a Testimonial' : 'Laisser un témoignage'}
            title={locale === 'en' ? 'Leave a Testimonial' : 'Laisser un témoignage'}
            description={
              locale === 'en'
                ? 'Thank you for your feedback! It will appear on the site after a quick review.'
                : 'Merci pour votre retour! Il apparaitra sur le site apres une courte revision.'
            }
          />
        </div>

      </section>







      <section id="resume" className="mt-20 scroll-mt-24">



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



                  <ResumePreviewClient fileUrl={resume.fileUrl} />



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



      <section id="contact" className="mt-32 max-w-2xl mx-auto scroll-mt-24">



        <h2 className="text-3xl font-bold mb-8 text-center">



          {locale === 'en' ? 'Get in Touch' : 'Contactez-moi'}



        </h2>



        <ContactForm />



      </section>



      </main>
      <BottomNav locale={locale} />
    </>



  );



}

