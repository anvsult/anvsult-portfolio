import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { approveTestimonial, deleteTestimonial } from "./actions";
import { Check, Trash2, Clock } from "lucide-react";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

export default async function TestimonialAdmin() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          approved: "Testimonial approved",
          deleted: "Testimonial deleted",
        }}
      />
      <h1 className="text-3xl font-bold">Testimonial Moderation</h1>
      
      <div className="grid gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className={!t.isApproved ? "border-yellow-500 bg-yellow-50/10" : ""}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.authorName}</CardTitle>
                <p className="text-sm text-muted-foreground">{t.authorRole}</p>
              </div>
              <div className="flex gap-2">
                {!t.isApproved && (
                  <AdminActionForm
                    action={approveTestimonial.bind(null, t.id)}
                    size="sm"
                    buttonClassName="gap-2 bg-green-600 hover:bg-green-700"
                    pendingLabel="Approving..."
                  >
                    <Check size={16} /> Approve
                  </AdminActionForm>
                )}
                <AdminActionForm
                  action={deleteTestimonial.bind(null, t.id)}
                  variant="destructive"
                  size="icon"
                  confirmTitle="Delete testimonial?"
                  confirmDescription="This action cannot be undone."
                  confirmLabel="Delete"
                  pendingLabel="Deleting..."
                  ariaLabel="Delete testimonial"
                >
                  <Trash2 size={16} />
                </AdminActionForm>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">"{t.contentEn}"</p>
              {!t.isApproved && (
                <div className="flex items-center gap-2 mt-4 text-xs text-yellow-600 font-medium">
                  <Clock size={12} /> Pending Approval
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
