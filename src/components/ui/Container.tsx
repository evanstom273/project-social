import { type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: 'content' | 'feed' | 'full';
};

const widthClasses: Record<NonNullable<ContainerProps['width']>, string> = {
  content: 'max-w-[var(--spacing-content-max)]',
  feed: 'max-w-[var(--spacing-feed-max)]',
  full: 'max-w-none',
};

export function Container({
  width = 'content',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full', widthClasses[width], className)}
      {...props}
    />
  );
}
