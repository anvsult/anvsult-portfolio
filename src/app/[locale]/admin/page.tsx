import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageSquare, Star, Code } from "lucide-react";

export default async function AdminDashboard() {
  // Fetch counts for a quick overview
  const [projectCount, messageCount, skillCount, testimonialCount] = await Promise.all([
    prisma.project.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.skill.count(),
    prisma.testimonial.count({ where: { isApproved: false } }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount, icon: <Briefcase className="text-blue-500" /> },
    { label: "New Messages", value: messageCount, icon: <MessageSquare className="text-green-500" /> },
    { label: "Skills", value: skillCount, icon: <Code className="text-purple-500" /> },
    { label: "Pending Testimonials", value: testimonialCount, icon: <Star className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Welcome back, Anvar!</h2>
        <p className="text-muted-foreground">
          Use the sidebar to manage your portfolio content. Changes made here will reflect live on your site.
        </p>
      </div>
    </div>
  );
}