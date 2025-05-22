"use client";

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import SectionWrapper from '@/components/shared/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/config/site';
import { Loader2, Send, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

export default function ContactSection() {
  const initialState: ContactFormState = { message: "", status: "idle" };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      formRef.current?.reset(); // Reset form on success
    } else if (state.status === "error" && state.message) {
      // Display general error message
      toast({
        title: "Submission Error",
        description: state.message,
        variant: "destructive",
      });
      // Specific field errors are handled below the input fields
    }
  }, [state, toast]);

  return (
    <SectionWrapper 
      id="contact" 
      title="Get In Touch"
      subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send Me a Message</CardTitle>
            <CardDescription>Fill out the form below, and I&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required className="mt-1" />
                {state.errors?.name && <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className="mt-1" />
                 {state.errors?.email && <p className="mt-1 text-sm text-destructive">{state.errors.email[0]}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} className="mt-1" />
                {state.errors?.message && <p className="mt-1 text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Other ways to reach out or connect.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">Planet Earth (Remote Friendly)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Connect on Social Media</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-3">
              {SOCIAL_LINKS.map((link) => (
                <Button key={link.name} variant="outline" size="icon" asChild>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <link.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}
