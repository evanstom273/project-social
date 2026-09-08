import { createContext } from 'react';
import type { Project } from '@/domain/types';
import type { ProjectInput } from '@/integrations/local/project-store';

export type ProjectsContextValue = {
	projects: Project[];
	isLoading: boolean;
	createProject: (input: ProjectInput) => Promise<Project>;
	updateProject: (id: string, input: ProjectInput) => Promise<Project>;
	deleteProject: (id: string) => Promise<void>;
	getProjectById: (id: string) => Project | undefined;
};

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);
