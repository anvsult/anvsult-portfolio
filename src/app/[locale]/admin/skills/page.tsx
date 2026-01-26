import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createSkill } from "./actions";

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
              <label className="text-sm font-medium">Proficiency (%)</label>
              <Input name="proficiency" type="number" min={0} max={100} placeholder="80" required />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(skill => (
          <Card key={skill.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{skill.nameEn}</p>
              <p className="text-xs text-muted-foreground">{skill.category}</p>
            </div>
            <div className="text-primary font-bold">{skill.proficiency}%</div>
          </Card>
        ))}
      </div>
    </div>
  );
}