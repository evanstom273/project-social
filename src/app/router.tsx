import { Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { CommunitiesPage } from '@/features/communities/CommunitiesPage';
import { CreatePage } from '@/features/create/CreatePage';
import { ExplorePage } from '@/features/explore/ExplorePage';
import { HomeDiscoveryRail, HomePage } from '@/features/home/HomePage';
import { LoginPage } from '@/features/auth/LoginPage';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { SavedPage } from '@/features/saved/SavedPage';
import { SignupPage } from '@/features/auth/SignupPage';

function ShellLayout() {
	return (
		<AppShell rightRail={<HomeDiscoveryRail />}>
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
