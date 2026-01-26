'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface ProjectProps {
  title: string
  description: string
  techStack: string[]
  githubLink?: string | null
  liveLink?: string | null
  index: number // Used for staggered animation
}

export function ProjectCard({ title, description, techStack, githubLink, liveLink, index }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px]">
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-sm line-clamp-3">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex gap-4">
          {liveLink && (
            <Button asChild size="sm" className="gap-2">
              <Link href={liveLink} target="_blank">
                <ExternalLink size={16} /> Demo
              </Link>
            </Button>
          )}
          {githubLink && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href={githubLink} target="_blank">
                <Github size={16} /> Code
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}