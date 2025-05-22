import SectionWrapper from '@/components/shared/section-wrapper';
import IconCard from '@/components/shared/icon-card';
import { SKILL_CATEGORIES } from '@/config/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SkillsSection() {
  return (
    <SectionWrapper 
      id="skills" 
      title="My Expertise"
      subtitle="A glimpse into the technologies and methodologies I work with."
    >
      <div className="space-y-12">
        {SKILL_CATEGORIES.map((category) => (
          <Card key={category.title} className="overflow-hidden shadow-lg border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl font-semibold text-primary">{category.title}</CardTitle>
              <CardDescription className="text-foreground/80">
                Core competencies in {category.title.toLowerCase()}.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group relative flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-accent">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-medium text-center text-foreground">{skill.name}</h4>
                    {skill.level && (
                      <Badge variant="secondary" className="mt-2 text-xs group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        {skill.level}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
