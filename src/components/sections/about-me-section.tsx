"use client";

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateAiBio, type UpdateAiBioInput } from '@/ai/flows/update-ai-bio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import SectionWrapper from '@/components/shared/section-wrapper';
import { Loader2, RefreshCw, CheckCircle, Edit3, Sparkles } from 'lucide-react';
import { YOUR_NAME, YOUR_JOB_TITLE } from '@/config/site';

const bioFormSchema = z.object({
  name: z.string().min(1, "Name is required.").default(YOUR_NAME),
  jobTitle: z.string().min(1, "Job title is required.").default(YOUR_JOB_TITLE),
  experience: z.string().min(10, "Experience summary is required.").default("Several years of experience in full-stack development, DevOps practices, and AI/ML projects. Proven ability to deliver high-quality software solutions and optimize system performance."),
  skills: z.string().min(5, "Skills are required.").default("React, Next.js, Node.js, Python, Docker, Kubernetes, AWS, TensorFlow, CI/CD, Agile Methodologies"),
  projects: z.string().min(5, "Project highlights are required.").default("AI-Powered E-commerce Platform, Automated CI/CD Pipeline, Customer Churn Prediction Dashboard"),
});

type BioFormValues = z.infer<typeof bioFormSchema>;

export default function AboutMeSection() {
  const [generatedBio, setGeneratedBio] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(true);
  const { toast } = useToast();

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: bioFormSchema.parse({}), // To populate with default values
  });

  const onSubmit: SubmitHandler<BioFormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedBio(null); 
    try {
      const result = await updateAiBio(data);
      setGeneratedBio(result.bio);
      setIsEditing(false);
      toast({
        title: "Bio Generated!",
        description: "Your AI-powered bio has been successfully created.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating bio:", error);
      toast({
        title: "Error Generating Bio",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    onSubmit(form.getValues());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleApprove = () => {
    setIsEditing(false); // Or any other action for "approval"
    toast({
      title: "Bio Approved!",
      description: "You've approved the generated bio.",
    });
  };

  return (
    <SectionWrapper id="about" title="About Me" subtitle="A little bit about my journey and expertise.">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Bio Generator
            </CardTitle>
            <CardDescription>
              {isEditing 
                ? "Fill in your details, and let AI craft a unique summary of your experience." 
                : "Review your generated bio or edit your details for a new one."}
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Full Stack Developer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Summary</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Briefly describe your experience..." {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Skills (comma-separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., React, Node.js, Python" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notable Projects (comma-separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Project Alpha, Cool App Beta" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  generatedBio && (
                    <div className="space-y-4 rounded-md border bg-muted/50 p-6 text-sm text-foreground prose prose-sm max-w-none dark:prose-invert">
                       {generatedBio.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                {isEditing ? (
                  <Button type="submit" disabled={isGenerating} className="w-full sm:w-auto">
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generate Bio
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleEdit} disabled={isGenerating} className="w-full sm:w-auto">
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Details
                    </Button>
                    <Button onClick={handleRegenerate} disabled={isGenerating} variant="secondary" className="w-full sm:w-auto">
                      {isGenerating && generatedBio === null ? ( // Show spinner only if regenerating new content
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Regenerate
                    </Button>
                    <Button onClick={handleApprove} disabled={isGenerating} className="w-full sm:w-auto">
                       <CheckCircle className="mr-2 h-4 w-4" /> Approve Bio
                    </Button>
                  </>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <div className="space-y-6 text-foreground/90">
          <h3 className="text-2xl font-semibold">My Philosophy</h3>
          <p className="text-base leading-relaxed">
            I believe in the power of technology to solve complex problems and create meaningful impact. My approach combines clean, efficient code with strategic thinking to deliver solutions that are not only functional but also scalable and user-centric.
          </p>
          <h3 className="text-2xl font-semibold">Continuous Learning</h3>
          <p className="text-base leading-relaxed">
            The tech landscape is ever-evolving, and I am committed to lifelong learning. Whether it&apos;s exploring new programming paradigms, mastering cutting-edge DevOps tools, or delving into the latest advancements in AI, I&apos;m always eager to expand my skillset and stay at the forefront of innovation.
          </p>
           { !isEditing && generatedBio && (
            <div className="lg:hidden mt-8"> {/* Show on mobile if not editing */}
              <h3 className="text-2xl font-semibold mb-4">Generated Bio</h3>
              <div className="space-y-4 rounded-md border bg-muted/50 p-6 text-sm text-foreground prose prose-sm max-w-none dark:prose-invert">
                {generatedBio.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
           )}
        </div>
      </div>
    </SectionWrapper>
  );
}
