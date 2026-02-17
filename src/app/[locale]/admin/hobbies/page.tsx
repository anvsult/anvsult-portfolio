import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HobbyDialog } from "./HobbyDialog";
import { deleteHobby } from "./actions";
import * as Icons from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

import { getTranslations } from "next-intl/server";

type LucideIconName = keyof typeof Icons;

export default async function HobbiesAdmin() {
  const t = await getTranslations('hobbies');
  const hobbies = await prisma.hobby.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          deleted: t('hobbyDeleted'),
        }}
      />
      <h1 className="text-3xl font-bold">{t('hobbies')}</h1>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('manageHobbies')}</h2>
        <HobbyDialog
          trigger={<Button variant="default">{t('addNewHobby')}</Button>}
          title={t('addNewHobbyTitle')}
          description={t('addNewHobbyDesc')}
          submitLabel={t('addHobby')}
        />
      </div>

      <div className="space-y-4">
        {hobbies.map((hobby) => {
          const Icon = (hobby.iconName && Icons[hobby.iconName as LucideIconName]
            ? Icons[hobby.iconName as LucideIconName]
            : null) as React.ComponentType<{ className?: string; size?: number }> | null;

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
                  <AdminActionForm
                    action={deleteHobby.bind(null, hobby.id)}
                    variant="destructive"
                    size="icon"
                    confirmTitle="Delete hobby?"
                    confirmDescription={`This will remove \"${hobby.nameEn}\" permanently.`}
                    confirmLabel="Delete"
                    pendingLabel="Deleting..."
                    ariaLabel={`Delete ${hobby.nameEn}`}
                  >
                    <Trash2 size={16} />
                  </AdminActionForm>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
