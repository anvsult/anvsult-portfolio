import { prisma } from "@/lib/db";
import { HobbyForm } from "./HobbyForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteHobby } from "./actions";
import { Trash2 } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function HobbiesAdmin() {
  const locale = await getLocale();
  const hobbies = await prisma.hobby.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Hobbies</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Hobby</CardTitle>
        </CardHeader>
        <CardContent>
          <HobbyForm />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Hobbies</h2>
        {hobbies.map((hobby) => (
          <Card key={hobby.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{hobby.nameEn} / {hobby.nameFr}</h3>
                <p className="text-sm text-muted-foreground">{hobby.iconName}</p>
              </div>
              <div className="flex gap-2">
                {/* TODO: Add Edit functionality */}
                <form action={deleteHobby.bind(null, hobby.id)}>
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
