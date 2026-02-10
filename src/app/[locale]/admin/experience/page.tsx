import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceActions } from "./ExperienceActions";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";
import { ExperienceDialog } from "./ExperienceDialog";
import { Button } from "@/components/ui/button";

export default async function ExperienceAdmin() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          deleted: "Experience deleted",
          moved_up: "Moved up",
          moved_down: "Moved down",
        }}
      />
      <h1 className="text-3xl font-bold">Manage Experience</h1>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Maintain your timeline entries.</p>
        <ExperienceDialog
          trigger={<Button>Add Experience</Button>}
          title="Add Experience"
          description="Fill in the details and save."
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Experiences</h2>
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
