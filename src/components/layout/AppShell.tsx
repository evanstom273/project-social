import { type ReactNode } from 'react';

import { DesktopNavRail } from '@/components/layout/DesktopNavRail';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Container } from '@/components/ui/Container';

type AppShellProps = {
  children: ReactNode;
  rightRail?: ReactNode;
};

export function AppShell({ children, rightRail }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <Container className="flex min-h-dvh gap-6 lg:gap-8">
        <DesktopNavRail />

        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-8">
          <main className="gutter-x flex-1 py-6 lg:py-8">{children}</main>
        </div>

        {rightRail ? (
          <aside
            className="hidden xl:block w-72 shrink-0 py-8 pr-[var(--spacing-gutter-desktop)]"
            aria-label="Context"
          >
            {rightRail}
          </aside>
        ) : null}
      </Container>

      <MobileBottomNav />
    </div>
  );
}
