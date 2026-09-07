import { Link } from 'react-router-dom';

import { APP_NAME } from '@/config/constants';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2.5 group', className)}
      aria-label={`${APP_NAME} home`}
    >
      <span
        className="flex size-9 items-center justify-center rounded-md bg-primary-muted text-primary text-label-md"
        aria-hidden="true"
      >
        PS
      </span>
      <span className="text-headline-sm text-text-primary group-hover:text-primary transition-colors duration-fast">
        {APP_NAME}
      </span>
    </Link>
  );
}
