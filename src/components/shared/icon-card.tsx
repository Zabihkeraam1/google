import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface IconCardProps {
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  className?: string;
  iconClassName?: string;
}

export default function IconCard({ icon: Icon, title, description, className, iconClassName }: IconCardProps) {
  return (
    <Card className={cn("flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300", className)}>
      <CardHeader>
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className={cn("h-8 w-8", iconClassName)} />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  );
}
