import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { approveTestimonial, deleteTestimonial } from "./actions";
import { Check, Trash2, Clock } from "lucide-react";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

import { getTranslations } from "next-intl/server";

export default async function TestimonialAdmin() {
  const t = await getTranslations('admin');
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          approved: t('testimonialApproved'),
          deleted: t('testimonialDeleted'),
        }}
      />
      <h1 className="text-3xl font-bold">{t('testimonialModeration')}</h1>

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <div className="text-muted-foreground">{t('nothingPending')}</div>
        ) : (
          testimonials.map((tItem) => (
            <Card key={tItem.id} className={!tItem.isApproved ? "border-yellow-500 bg-yellow-50/10" : ""}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{tItem.authorName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tItem.authorRole}</p>
                </div>
                <div className="flex gap-2">
                  {!tItem.isApproved && (
                    <AdminActionForm
                      action={approveTestimonial.bind(null, tItem.id)}
                      size="sm"
                      buttonClassName="gap-2 bg-green-600 hover:bg-green-700"
                      pendingLabel={t('approving')}
                    >
                      <Check size={16} /> {t('approve')}
                    </AdminActionForm>
                  )}
                  <AdminActionForm
                    action={deleteTestimonial.bind(null, tItem.id)}
                    variant="destructive"
                    size="icon"
                    confirmTitle={t('deleteTestimonialConfirm')}
                    confirmDescription={t('deleteConfirmDesc')}
                    confirmLabel={t('delete')}
                    pendingLabel={t('deleting')}
                    ariaLabel={t('deleteTestimonial')}
                  >
                    <Trash2 size={16} />
                  </AdminActionForm>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic">"{tItem.contentEn}"</p>
                {!tItem.isApproved && (
                  <div className="flex items-center gap-2 mt-4 text-xs text-yellow-600 font-medium">
                    <Clock size={12} /> {t('pendingApproval')}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
