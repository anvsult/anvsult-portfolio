import { Card, CardContent } from "@/components/ui/card"
import { MotionInView } from "@/components/motion/MotionInView"

interface TestimonialProps {
  name: string
  role: string | null
  content: string
  index: number
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

export function TestimonialCard({ name, role, content, index }: TestimonialProps) {
  const initials = getInitials(name);
  
  return (
    <MotionInView
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1 
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="relative overflow-visible h-full bg-card border-border shadow-xl">
        <CardContent className="pt-24 px-8 pb-8 text-center">
          {/* Profile Picture with Initials */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-2xl border-4 border-card">
              {initials}
            </div>
          </div>
          
          {/* Name */}
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {name}
          </h3>
          
          {/* Role */}
          {role && (
            <p className="text-muted-foreground text-sm mb-6">
              {role}
            </p>
          )}
          
          {/* Testimonial Content */}
          <p className="text-foreground/80 leading-relaxed text-base">
            {content}
          </p>
        </CardContent>
      </Card>
    </MotionInView>
  )
}
