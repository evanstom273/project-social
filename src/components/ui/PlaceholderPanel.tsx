import { type ReactNode } from 'react';

import { cn } from '@/lib/cn';

type PlaceholderPanelProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PlaceholderPanel({
  title,
  description,
  children,
}: PlaceholderPanelProps) {
  return (
    <section
      className={cn(
        'rounded-lg border border-border-subtle bg-surface-raised p-6 md:p-8',
      )}
    >
      <h1 className="text-headline-md text-text-primary">{title}</h1>
      <p className="mt-3 text-body-md text-text-secondary">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
