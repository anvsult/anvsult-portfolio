'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialProps {
  name: string
  role: string | null
  content: string
  index: number
}

export function TestimonialCard({ name, role, content, index }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ 
        type: "spring",
        duration: 0.8, 
        delay: index * 0.1 
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="relative overflow-hidden h-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        <CardContent className="pt-10 px-7 pb-7">
          <Quote className="absolute top-6 right-6 text-white/10 w-16 h-16 -z-10" />
          
          <p className="text-foreground/80 italic leading-relaxed mb-6 font-light">
            "{content}"
          </p>
          
          <div className="flex items-center gap-4 mt-auto">
            <div className="h-11 w-11 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30">
              {name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-base leading-none">{name}</h4>
              {role && <p className="text-xs text-muted-foreground mt-1.5">{role}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}