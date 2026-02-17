import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResumeUploadForm } from "@/components/admin/ResumeUploadForm";
import { getTranslations } from "next-intl/server";

export default async function AdminResumePage() {
  const t = await getTranslations('admin');

  // Fetch resumes
  const resumes = await prisma.resume.findMany();
  const resumeEn = resumes.find(r => r.locale === 'en');
  const resumeFr = resumes.find(r => r.locale === 'fr');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('resumeManagement')}</h1>
        <p className="text-muted-foreground">{t('resumeManagementDesc')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('resumeEn')}</CardTitle>
            <CardDescription>{t('resumeEnDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploadForm
              locale="en"
              label={t('englishLabel')}
              existingResume={resumeEn}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('resumeFr')}</CardTitle>
            <CardDescription>{t('resumeFrDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResumeUploadForm
              locale="fr"
              label={t('frenchLabel')}
              existingResume={resumeFr}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
