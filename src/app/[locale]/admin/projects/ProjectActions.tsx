import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProject } from "./actions";
import Link from "next/link";
import { AdminActionForm } from "@/components/admin/AdminActionForm";

interface ProjectActionsProps {
  projectId: string;
  projectTitle: string;
  locale: string;
}

import { useTranslations } from "next-intl";

export function ProjectActions({ projectId, projectTitle, locale }: ProjectActionsProps) {
  const t = useTranslations('admin');
  return (
    <div className="flex gap-2">
      <Link href={`/${locale}/admin/projects/${projectId}/edit`}>
        <Button variant="outline" size="icon" aria-label={t('ariaEdit', { title: projectTitle })}>
          <Pencil size={16} />
        </Button>
      </Link>
      <AdminActionForm
        action={deleteProject.bind(null, projectId)}
        variant="destructive"
        size="icon"
        confirmTitle={t('deleteProjectConfirm')}
        confirmDescription={t('deleteProjectDesc', { title: projectTitle })}
        confirmLabel={t('delete')}
        pendingLabel={t('deleting')}
        ariaLabel={t('ariaDelete', { title: projectTitle })}
      >
        <Trash2 size={16} />
      </AdminActionForm>
    </div>
  );
}
