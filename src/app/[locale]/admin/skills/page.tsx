import { prisma } from "@/lib/db";
import { Trash2 } from "lucide-react";
import { deleteSkill } from "./actions";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";
import { SkillDialog } from "./SkillDialog";
import { Button } from "@/components/ui/button";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { category: 'asc' }
  });

  return (
    <div className="space-y-8">
      <SearchParamsToast
        messages={{
          deleted: "Skill deleted",
        }}
      />
      <h1 className="text-3xl font-bold">Manage Skills</h1>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Create and manage skill tags.</p>
        <SkillDialog
          trigger={<Button>Add Skill</Button>}
          title="Add Skill"
          description="Fill in the details and save."
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
              ariaLabel={`Delete ${skill.nameEn}`}
              confirmTitle="Delete skill?"
              confirmDescription={`This will remove \"${skill.nameEn}\" permanently.`}
              confirmLabel="Delete"
              pendingLabel="Deleting..."
            >
              <Trash2 size={16} />
            </AdminActionForm>
          </div>
        ))}
      </div>
    </div>
  );
}
