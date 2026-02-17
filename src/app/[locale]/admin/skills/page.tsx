import { prisma } from "@/lib/db";
import { Trash2 } from "lucide-react";
import { deleteSkill } from "./actions";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";
import { SkillDialog } from "./SkillDialog";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function AdminSkillsPage() {
  const t = await getTranslations('admin');
  const skills = await prisma.skill.findMany({
    orderBy: { category: 'asc' }
  });

  return (
    <div className="space-y-8">
      <SearchParamsToast
        messages={{
          deleted: t('skillDeleted'),
        }}
      />
      <h1 className="text-3xl font-bold">{t('manageSkills')}</h1>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t('skillsDesc')}</p>
        <SkillDialog
          trigger={<Button>{t('addSkill')}</Button>}
          title={t('addSkill')}
          description={t('skillDialogDesc')}
        />
      </div>

      {/* Skills Table/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="flex items-center justify-between gap-3 rounded-md border bg-card/50 px-3 py-2"
          >
            <div>
              <p className="text-sm font-semibold">{skill.nameEn}</p>
              <p className="text-[11px] text-muted-foreground">{skill.category}</p>
            </div>
            <AdminActionForm
              action={deleteSkill.bind(null, skill.id)}
              variant="destructive"
              size="icon-sm"
              ariaLabel={t('ariaDelete', { title: skill.nameEn })}
              confirmTitle={t('deleteSkillConfirm')}
              confirmDescription={t('deleteSkillDesc', { name: skill.nameEn })}
              confirmLabel={t('delete')}
              pendingLabel={t('deleting')}
            >
              <Trash2 size={16} />
            </AdminActionForm>
          </div>
        ))}
      </div>
    </div>
  );
}
