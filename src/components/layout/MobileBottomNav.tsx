import { NavLink } from 'react-router-dom';

import { NAV_ITEMS } from '@/config/constants';
import { cn } from '@/lib/cn';

function navLinkClassName({
  isActive,
  emphasis,
}: {
  isActive: boolean;
  emphasis?: boolean;
}) {
  if (emphasis) {
    return cn(
      'flex flex-col items-center justify-center gap-1 rounded-default px-3 py-2 text-caption transition-colors duration-fast min-w-11 min-h-11',
      'text-primary',
    );
  }

  return cn(
    'flex flex-col items-center justify-center gap-1 rounded-default px-3 py-2 text-caption transition-colors duration-fast min-w-11 min-h-11',
    isActive
      ? 'text-primary'
      : 'text-text-muted hover:text-text-primary',
  );
}

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/95 backdrop-blur-sm lg:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="mx-auto flex max-w-[var(--spacing-content-max)] items-stretch justify-around px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                navLinkClassName({ isActive, emphasis: item.emphasis })
              }
            >
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-label-sm',
                  item.emphasis && 'bg-primary text-on-primary',
                )}
                aria-hidden="true"
              >
                {item.label.charAt(0)}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
