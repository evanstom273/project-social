import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ProjectsContext } from './projects-context';
import type { Project } from '@/domain/types';
import type { ProjectInput } from '@/integrations/local/project-store';
import { createProject as createLocalProject, deleteProject as deleteLocalProject, listProjects, updateProject as updateLocalProject } from '@/integrations/local/project-store';
import { useFeedPosts } from './use-feed-posts';

export function ProjectsProvider({ children }: { children: ReactNode }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { refreshPosts } = useFeedPosts();
	const refresh = useCallback(async () => setProjects(await listProjects()), []);
	useEffect(() => { void refresh().finally(() => setIsLoading(false)); }, [refresh]);
	const createProject = useCallback(async (input: ProjectInput) => { const project = await createLocalProject(input); setProjects((current) => [project, ...current]); return project; }, []);
	const updateProject = useCallback(async (id: string, input: ProjectInput) => { const project = await updateLocalProject(id, input); setProjects((current) => current.map((item) => item.id === id ? project : item)); await refreshPosts(); return project; }, [refreshPosts]);
	const deleteProject = useCallback(async (id: string) => { await deleteLocalProject(id); setProjects((current) => current.filter((item) => item.id !== id)); await refreshPosts(); }, [refreshPosts]);
	const getProjectById = useCallback((id: string) => projects.find((project) => project.id === id), [projects]);
	const value = useMemo(() => ({ projects, isLoading, createProject, updateProject, deleteProject, getProjectById }), [projects, isLoading, createProject, updateProject, deleteProject, getProjectById]);
	return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}
