import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  ...props
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 flex flex-col items-center", className)} {...props}>
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-10 text-center md:mb-12">
            {title && (
              <h2 className={cn("text-3xl font-bold tracking-tight text-foreground sm:text-4xl", titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn("mt-3 text-lg text-muted-foreground sm:mt-4", subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={cn(contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
