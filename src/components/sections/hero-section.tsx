import { Button } from '@/components/ui/button';
import { YOUR_NAME, YOUR_JOB_TITLE } from '@/config/site';
import { ArrowDown, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary to-background py-20 text-center">
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url('/assets/grid.svg')"}}></div>
      <div className="relative z-10 container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Image
            src="https://placehold.co/160x160.png"
            alt={YOUR_NAME}
            width={160}
            height={160}
            className="rounded-full border-4 border-primary shadow-lg"
            data-ai-hint="professional portrait"
            priority
          />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="text-primary">{YOUR_NAME}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
          {YOUR_JOB_TITLE}
        </p>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Passionate about building innovative solutions and driving technological advancements.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="#projects">
              View My Work <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="shadow-sm hover:shadow-accent/30 transition-shadow">
            {/* Replace with actual resume link */}
            <Link href="/resume.pdf" download="YourName_Resume.pdf" target="_blank"> 
              Download Resume <Download className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-primary opacity-50" />
      </div>
    </section>
  );
}
