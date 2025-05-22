import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <Card className="flex h-full transform flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <DialogTrigger asChild>
          <div className="relative h-48 w-full cursor-pointer overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={project.dataAiHint || 'project image'}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          </div>
        </DialogTrigger>
        <CardHeader className="flex-grow p-5">
          <CardTitle className="text-xl font-semibold text-foreground">{project.title}</CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-3">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto flex justify-start gap-2 border-t p-5">
          <DialogTrigger asChild>
             <Button variant="outline" size="sm" className="text-xs">
                View Details
             </Button>
          </DialogTrigger>
          {project.liveUrl && project.liveUrl !== '#' && (
            <Button variant="default" size="sm" asChild className="text-xs">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          {project.repoUrl && project.repoUrl !== '#' && (
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> Source
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <div className="relative mt-4 h-64 w-full overflow-hidden rounded-md">
            <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.dataAiHint || 'project image'}
            />
          </div>
          <DialogDescription className="mt-4 text-base text-muted-foreground">
            {project.longDescription || project.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {project.liveUrl && project.liveUrl !== '#' && (
            <Button variant="default" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {project.repoUrl && project.repoUrl !== '#' && (
            <Button variant="outline" asChild>
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Source
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
