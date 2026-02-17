import { getLocale, getTranslations } from 'next-intl/server';
import { getLandingData } from '@/lib/portfolio';
import { ContactForm } from '@/components/portfolio/ContactForm';
import { TestimonialWall } from '@/components/portfolio/TestimonialWall';
import { Card, CardContent } from "@/components/ui/card";
import { ResumePreviewClient } from "@/components/portfolio/ResumePreviewClient";
import { HeroSection } from '@/components/portfolio/HeroSection';
import { TestimonialDialog } from '@/components/portfolio/TestimonialDialog';
import { Timeline } from '@/components/portfolio/Timeline';
import { HobbyCard } from '@/components/portfolio/HobbyCard';
import { ResumeDownloader } from '@/components/portfolio/ResumeDownloader';
import { BottomNav } from '@/components/portfolio/BottomNav';
import { Marquee } from "@/components/motion/Marquee";
import { FeaturedProjectsTimeline } from "@/components/portfolio/FeaturedProjectsTimeline";

export default async function LandingPage() {
  const locale = await getLocale();
  const t = await getTranslations('Index');
  const { projects, skills, testimonials, experiences, hobbies, resume } = await getLandingData(locale);

  const skillLabels = skills.map((skill) => (locale === 'en' ? skill.nameEn : skill.nameFr));

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 py-20 pb-32">
        {/* Hero Section */}
        <HeroSection />

        {/* Projects Gallery */}
        <section id="projects" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8">
            {t('featuredProjects')}
          </h2>
          <FeaturedProjectsTimeline
            projects={projects.map((project) => ({
              id: project.id,
              title: locale === 'en' ? project.titleEn : project.titleFr,
              techStack: project.techStack,
              projectStartDate: project.projectStartDate,
              projectEndDate: project.projectEndDate,
              isActive: project.isActive,
              imageUrl: project.imageUrl,
              githubLink: project.githubLink,
              liveLink: project.liveLink,
              description: locale === 'en' ? project.descriptionEn : project.descriptionFr,
            }))}
          />
        </section>

        {/* Experience Timeline */}
        <section id="journey" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            {t('myJourney')}
          </h2>
          <Timeline experiences={experiences} locale={locale} />
        </section>

        {/* Skills Grid */}
        <section id="skills" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8">
            {t('skills')}
          </h2>

          <Marquee
            items={skillLabels}
            className="mb-8"
            itemClassName="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wide"
            duration={24}
          />
        </section>

        {/* Hobbies Bento Grid */}
        <section id="hobbies" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            {t('hobbies')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[300px]">
            {hobbies.map((hobby, index) => (
              <HobbyCard
                key={hobby.id}
                index={index}
                name={locale === 'en' ? hobby.nameEn : hobby.nameFr}
                description={locale === 'en' ? hobby.descriptionEn : hobby.descriptionFr}
                iconName={hobby.iconName}
                className={'col-span-1 row-span-1'}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            {t('whatOthersSay')}
          </h2>

          <TestimonialWall testimonials={testimonials} locale={locale} />

          <div className="mt-12 text-center">
            <TestimonialDialog />
          </div>
        </section>

        <section id="resume" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            {t('myResume')}
          </h2>

          <Card className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5">
            <CardContent>
              {resume ? (
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{resume.fileName}</h3>
                    <p className="text-muted-foreground mt-2">
                      {t('latestVersion')}: {resume.version}
                    </p>
                    <ResumeDownloader fileUrl={resume.fileUrl} fileName={resume.fileName} />
                  </div>
                  <div className="flex-1">
                    <ResumePreviewClient fileUrl={resume.fileUrl} />
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  {t('resumeNotAvailable')}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32 max-w-2xl mx-auto scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('getInTouch')}
          </h2>
          <ContactForm />
        </section>
      </main>
      <BottomNav locale={locale} />
    </>
  );
}
