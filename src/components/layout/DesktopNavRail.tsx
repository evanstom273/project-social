import { NavLink } from 'react-router-dom';

import { DESKTOP_NAV_ITEMS, ROUTES } from '@/config/constants';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'flex items-center gap-3 rounded-default px-3 py-2.5 text-body-md transition-colors duration-fast min-h-11',
    isActive
      ? 'bg-primary-muted text-primary'
      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
  );
}

export function DesktopNavRail() {
  return (
    <aside
      className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col lg:gap-6 lg:py-6 lg:pr-4"
      aria-label="Desktop navigation"
    >
      <Logo className="px-3" />

      <nav className="flex flex-col gap-1">
        {DESKTOP_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navLinkClassName}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3">
        <NavLink
          to={ROUTES.create}
          className="flex items-center justify-center rounded-default bg-primary px-4 py-2.5 text-label-md text-on-primary transition-colors duration-fast hover:bg-primary-hover min-h-11"
        >
          Create
        </NavLink>
      </div>
    </aside>
  );
}
