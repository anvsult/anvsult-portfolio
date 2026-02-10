import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { createSkill, deleteSkill } from "./actions";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { category: 'asc' }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Skills</h1>

      {/* Quick Add Form */}
      <Card>
        <CardContent className="pt-6">
          <form action={createSkill} className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name (EN)</label>
              <Input name="nameEn" placeholder="TypeScript" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name (FR)</label>
              <Input name="nameFr" placeholder="TypeScript" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select name="category" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm">
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <Button type="submit">Add Skill</Button>
          </form>
        </CardContent>
      </Card>

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
            <form action={deleteSkill}>
              <input type="hidden" name="id" value={skill.id} />
              <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${skill.nameEn}`}>
                <Trash2 size={16} />
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}