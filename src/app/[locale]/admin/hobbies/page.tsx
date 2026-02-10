import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HobbyDialog } from "./HobbyDialog";
import { deleteHobby } from "./actions";
import * as Icons from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { getLocale } from "next-intl/server";

type LucideIconName = keyof typeof Icons;

export default async function HobbiesAdmin() {
  const locale = await getLocale();
  const hobbies = await prisma.hobby.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hobbies</h1>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Hobbies</h2>
        <HobbyDialog
          trigger={<Button variant="default">Add New Hobby</Button>}
          title="Add New Hobby"
          description="Fill in the details and save."
          submitLabel="Add Hobby"
        />
      </div>

      <div className="space-y-4">
        {hobbies.map((hobby) => {
          const Icon =
            hobby.iconName && Icons[hobby.iconName as LucideIconName]
              ? Icons[hobby.iconName as LucideIconName]
              : null;

          return (
            <Card key={hobby.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                  <div>
                    <h3 className="font-semibold">{hobby.nameEn} / {hobby.nameFr}</h3>
                    <p className="text-sm text-muted-foreground">{hobby.iconName}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <HobbyDialog
                    trigger={
                      <Button variant="outline" size="icon">
                        <Pencil size={16} />
                      </Button>
                    }
                    title="Edit Hobby"
                    description="Update the hobby details and save."
                    initial={{
                      id: hobby.id,
                      nameEn: hobby.nameEn,
                      nameFr: hobby.nameFr,
                      descriptionEn: hobby.descriptionEn,
                      descriptionFr: hobby.descriptionFr,
                      iconName: hobby.iconName,
                    }}
                    submitLabel="Save Changes"
                  />
                  <form action={deleteHobby.bind(null, hobby.id)}>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
