import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceActions } from "./ExperienceActions";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";
import { ExperienceDialog } from "./ExperienceDialog";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ExperienceAdmin() {
  const t = await getTranslations('admin');
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          deleted: t('experienceDeleted'),
          moved_up: t('movedUp'),
          moved_down: t('movedDown'),
        }}
      />
      <h1 className="text-3xl font-bold">{t('manageExperience')}</h1>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t('experienceDesc')}</p>
        <ExperienceDialog
          trigger={<Button>{t('addExperience')}</Button>}
          title={t('addExperience')}
          description={t('experienceDialogDesc')}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t('existingExperiences')}</h2>
        {experiences.map((exp, index) => (
          <Card key={exp.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{exp.positionEn} at {exp.companyEn}</h3>
                <p className="text-sm text-muted-foreground">
                  {exp.startDate.toLocaleDateString()} - {exp.endDate?.toLocaleDateString() || 'Present'}
                </p>
              </div>
              <ExperienceActions
                id={exp.id}
                order={exp.order}
                isFirst={index === 0}
                isLast={index === experiences.length - 1}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
