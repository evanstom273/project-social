import { Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { Text } from '@/components/ui/Text';
import { CommunitiesPage } from '@/features/communities/CommunitiesPage';
import { CreatePage } from '@/features/create/CreatePage';
import { ExplorePage } from '@/features/explore/ExplorePage';
import { HomePage } from '@/features/home/HomePage';
import { LoginPage } from '@/features/auth/LoginPage';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { SavedPage } from '@/features/saved/SavedPage';
import { SignupPage } from '@/features/auth/SignupPage';

function DiscoveryRail() {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface-raised p-4">
      <Text as="h2" variant="label-md" className="text-text-secondary">
        Coming soon
      </Text>
      <Text variant="body-sm" muted className="mt-2">
        Active communities, followed projects, and discovery links will live here on
        desktop — never opaque recommendation panels.
      </Text>
    </div>
  );
}

function ShellLayout() {
  return (
    <AppShell rightRail={<DiscoveryRail />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </AppShell>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<ShellLayout />} />
    </Routes>
  );
}
