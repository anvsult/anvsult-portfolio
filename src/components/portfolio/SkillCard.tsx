'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface SkillCardProps {
  name: string
  category: string
  index: number
}

export function SkillCard({ name, category, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-1.5 space-y-1.5">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
              <h3 className="text-base font-semibold leading-none">{name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}