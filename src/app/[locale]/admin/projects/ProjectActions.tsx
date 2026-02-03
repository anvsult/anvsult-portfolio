'use client'

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProject } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectActionsProps {
  projectId: string;
  projectTitle: string;
}

export function ProjectActions({ projectId, projectTitle }: ProjectActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      return;
    }

    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/projects/${projectId}/edit`);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={handleEdit}>
        <Pencil size={16} />
      </Button>
      <Button variant="destructive" size="icon" onClick={handleDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
