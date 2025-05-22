"use client";

import * as React from 'react';
import SectionWrapper from '@/components/shared/section-wrapper';
import ProjectCard from '@/components/shared/project-card';
import { PROJECTS_DATA } from '@/config/site';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const ALL_TAG = "All Projects";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = React.useState<string>(ALL_TAG);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    PROJECTS_DATA.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return [ALL_TAG, ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === ALL_TAG) {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SectionWrapper 
      id="projects" 
      title="My Projects"
      subtitle="A selection of my work. Feel free to explore!"
    >
      <Tabs defaultValue={ALL_TAG} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center md:max-w-2xl mx-auto h-auto">
          {allTags.map((tag) => (
            <TabsTrigger 
              key={tag} 
              value={tag}
              className={cn(
                "w-full sm:w-auto flex-1 sm:flex-initial data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "whitespace-nowrap px-4 py-2 text-sm" 
              )}
            >
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeFilter} className="mt-0"> {/* Use activeFilter to ensure content re-renders */}
           {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">
              No projects found for the selected filter.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}
