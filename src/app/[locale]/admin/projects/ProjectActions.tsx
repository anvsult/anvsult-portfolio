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

export function ProjectActions({ projectId, projectTitle, locale }: ProjectActionsProps) {
  return (
    <div className="flex gap-2">
      <Link href={`/${locale}/admin/projects/${projectId}/edit`}>
        <Button variant="outline" size="icon" aria-label={`Edit ${projectTitle}`}>
          <Pencil size={16} />
        </Button>
      </Link>
      <AdminActionForm
        action={deleteProject.bind(null, projectId)}
        variant="destructive"
        size="icon"
        confirmTitle="Delete project?"
        confirmDescription={`This will permanently delete \"${projectTitle}\".`}
        confirmLabel="Delete"
        pendingLabel="Deleting..."
        ariaLabel={`Delete ${projectTitle}`}
      >
        <Trash2 size={16} />
      </AdminActionForm>
    </div>
  );
}
