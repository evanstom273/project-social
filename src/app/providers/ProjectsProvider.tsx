import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ProjectsContext } from './projects-context';
import type { Project } from '@/domain/types';
import type { ProjectInput } from '@/integrations/local/project-store';
import { createRemoteProject, deleteRemoteProject, listRemoteProjects, updateRemoteProject } from '@/data/remote-projects';
import { useAuth } from './auth-context';
import { useFeedPosts } from './use-feed-posts';

export function ProjectsProvider({ children }: { children: ReactNode }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { refreshPosts } = useFeedPosts();
	const { user, isLoading: authLoading } = useAuth();
	const refresh = useCallback(async () => { if (!user) { setProjects([]); return; } setProjects(await listRemoteProjects(user.id)); }, [user]);
	useEffect(() => { setIsLoading(true); void refresh().finally(() => setIsLoading(false)); }, [refresh, authLoading]);
	const createProject = useCallback(async (input: ProjectInput) => { if (!user) throw new Error('Sign in to create a project.'); const project = await createRemoteProject(user.id, input); setProjects((current) => [project, ...current]); return project; }, [user]);
	const updateProject = useCallback(async (id: string, input: ProjectInput) => { const project = await updateRemoteProject(id, input); setProjects((current) => current.map((item) => item.id === id ? project : item)); await refreshPosts(); return project; }, [refreshPosts]);
	const deleteProject = useCallback(async (id: string) => { await deleteRemoteProject(id); setProjects((current) => current.filter((item) => item.id !== id)); await refreshPosts(); }, [refreshPosts]);
	const getProjectById = useCallback((id: string) => projects.find((project) => project.id === id), [projects]);
	const value = useMemo(() => ({ projects, isLoading, createProject, updateProject, deleteProject, getProjectById }), [projects, isLoading, createProject, updateProject, deleteProject, getProjectById]);
	return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}
