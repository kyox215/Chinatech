import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SectionCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  children,
  title,
  description,
  action,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn("bg-white shadow-sm border-slate-200", className)}>
      {(title || description || action) && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="space-y-1">
            {title && <CardTitle className="text-lg font-medium text-slate-900">{title}</CardTitle>}
            {description && <CardDescription className="text-slate-500">{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
