import { prisma } from "@/lib/db";
import { ExperienceForm } from "./ExperienceForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteExperience, moveExperienceDown, moveExperienceUp } from "./actions";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";

export default async function ExperienceAdmin() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Experience</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceForm />
        </CardContent>
      </Card>

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
              <div className="flex gap-2">
                {/* TODO: Add Edit functionality */}
                <form action={moveExperienceUp.bind(null, exp.id, exp.order)}>
                  <Button variant="outline" size="icon" disabled={index === 0}>
                    <ArrowUp size={16} />
                  </Button>
                </form>
                <form action={moveExperienceDown.bind(null, exp.id, exp.order)}>
                  <Button variant="outline" size="icon" disabled={index === experiences.length - 1}>
                    <ArrowDown size={16} />
                  </Button>
                </form>
                <form action={deleteExperience.bind(null, exp.id)}>
                  <Button variant="destructive" size="icon">
                    <Trash2 size={16} />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
