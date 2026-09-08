import { Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { FeedDiscoveryRail } from '@/components/feed/FeedDiscoveryRail';
import { CommunitiesPage } from '@/features/communities/CommunitiesPage';
import { CreatePage } from '@/features/create/CreatePage';
import { ExplorePage } from '@/features/explore/ExplorePage';
import { HomePage } from '@/features/home/HomePage';
import { LoginPage } from '@/features/auth/LoginPage';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { PostDetailPage } from '@/features/posts/PostDetailPage';
import { SavedPage } from '@/features/saved/SavedPage';
import { SignupPage } from '@/features/auth/SignupPage';
import { ProfileSetupPage } from '@/features/auth/ProfileSetupPage';

function ShellLayout() {
	return (
		<AppShell rightRail={<FeedDiscoveryRail />}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/posts/:postId" element={<PostDetailPage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/create" element={<CreatePage />} />
				<Route path="/communities" element={<CommunitiesPage />} />
				<Route path="/projects" element={<ProjectsPage />} />
				<Route path="/projects/:projectId" element={<ProjectsPage />} />
				<Route path="/saved" element={<SavedPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/users/:handle" element={<ProfilePage />} />
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/signup" element={<SignupPage />} />
				<Route path="/auth/profile-setup" element={<ProfileSetupPage />} />
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
