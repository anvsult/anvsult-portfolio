import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, MailOpen, Mail } from "lucide-react";
import { deleteMessage, markAsRead } from "./actions";

export default async function MessageInboxPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">{messages.length} total messages</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p>Your inbox is empty. No messages yet!</p>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className={msg.isRead ? "opacity-70" : "border-l-4 border-l-primary"}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {msg.isRead ? <MailOpen size={16} /> : <Mail size={16} className="text-primary" />}
                      {msg.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.isRead && (
                      <form action={markAsRead.bind(null, msg.id)}>
                        <Button variant="outline" size="sm">Mark Read</Button>
                      </form>
                    )}
                    <form action={deleteMessage.bind(null, msg.id)}>
                      <Button variant="destructive" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-[10px] text-muted-foreground mt-4 italic">
                  Received on: {new Date(msg.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}