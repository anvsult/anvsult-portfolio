'use client';

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRef } from 'react';

type LucideIconName = keyof typeof Icons;

interface HobbyCardProps {
  name: string;
  description: string;
  iconName: string | null;
  className?: string;
  index: number;
}

export function HobbyCard({ name, description, iconName, className, index }: HobbyCardProps) {
  const Icon = (iconName && Icons[iconName as LucideIconName] ? Icons[iconName as LucideIconName] : null) as React.ComponentType<{ className?: string; size?: number }> | null;
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const xTransform = useTransform(smoothX, [-100, 100], [-6, 6]);
  const yTransform = useTransform(smoothY, [-100, 100], [-6, 6]);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.2), transparent 70%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current && !shouldReduceMotion) {
      const rect = cardRef.current.getBoundingClientRect();
      const newX = event.clientX - rect.left - rect.width / 2;
      const newY = event.clientY - rect.top - rect.height / 2;
      x.set(newX);
      y.set(newY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          ref={cardRef}
          onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
          onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          className={`h-full ${className} cursor-pointer transform-gpu will-change-transform`}
          style={shouldReduceMotion ? undefined : { rotateX: yTransform, rotateY: xTransform }}
        >
          <Card className="relative overflow-hidden h-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5 group">
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
            <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-black/20"></div>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
              {Icon && (
                <motion.div style={{ x: xTransform, y: yTransform }}>
                  <Icon className="w-8 h-8 text-primary mb-2" />
                </motion.div>
              )}
              <h3 className="font-bold text-sm">{name}</h3>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
            {name}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
