"use client";

import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('Index');

  return (
    <section id="top" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 scroll-mt-24">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">Anvar Sultanov</h1>
        <p className="text-xl text-muted-foreground">
          {t('title')}
        </p>
        <p className="text-lg text-muted-foreground">
          {t('aboutMeDescription')}
        </p>
        <Link href="#resume">
          <Button>
            {t('viewResumeButton')}
          </Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <Image
          src="/portrait.png"
          alt="Anvar Sultanov"
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
