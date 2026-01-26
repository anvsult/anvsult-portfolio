'use client'

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface SkillCardProps {
  name: string
  proficiency: number
  category: string
  index: number
}

export function SkillCard({ name, proficiency, category, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-2 space-y-2">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
              <h3 className="text-lg font-semibold leading-none">{name}</h3>
            </div>
            <span className="text-sm font-mono text-primary">{proficiency}%</span>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiency}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}