import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageShell({
  children,
  title,
  description,
  action,
  className,
}: PageShellProps) {
  return (
    <div className={cn("space-y-6 p-8 w-full max-w-7xl mx-auto", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
