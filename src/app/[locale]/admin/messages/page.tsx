import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, MailOpen, Mail } from "lucide-react";
import { deleteMessage, markAsRead } from "./actions";
import { AdminActionForm } from "@/components/admin/AdminActionForm";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

import { getTranslations } from "next-intl/server";

export default async function MessageInboxPage() {
  const t = await getTranslations('admin');
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          deleted: t('messageDeleted'),
          read: t('messageRead'),
        }}
      />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('inboxTitle')}</h1>
        <p className="text-muted-foreground">{t('totalMessages', { count: messages.length })}</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p>{t('inboxEmpty')}</p>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className={msg.isRead ? "opacity-70" : "border-l-4 border-l-primary"}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {msg.isRead ? <MailOpen size={16} /> : <Mail size={16} className="text-primary" />}
                      {msg.subject || t('noSubject')}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {t.rich('from', { name: msg.name })} ({msg.email})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.isRead && (
                      <AdminActionForm
                        action={markAsRead.bind(null, msg.id)}
                        variant="outline"
                        size="sm"
                        pendingLabel={t('marking')}
                      >
                        {t('markRead')}
                      </AdminActionForm>
                    )}
                    <AdminActionForm
                      action={deleteMessage.bind(null, msg.id)}
                      variant="destructive"
                      size="sm"
                      confirmTitle={t('deleteMessageConfirm')}
                      confirmDescription={t('deleteConfirmDesc')}
                      confirmLabel={t('delete')}
                      pendingLabel={t('deleting')}
                      ariaLabel={t('deleteMessage')}
                    >
                      <Trash2 size={16} />
                    </AdminActionForm>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-[10px] text-muted-foreground mt-4 italic">
                  {t('receivedOn', { date: new Date(msg.createdAt).toLocaleString() })}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
