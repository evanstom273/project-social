import type { Project, ProjectStatus } from '@/domain/types';
import { localDb, type LocalProjectRecord } from './db';

export type ProjectInput = {
	name: string;
	description: string;
	category: string;
	technology: string;
	status: ProjectStatus;
	avatarFile?: File;
	coverFile?: File;
};

function initial(name: string) { return name.trim().charAt(0).toUpperCase() || 'P'; }
function slugify(name: string) { return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'; }

function hydrate(record: LocalProjectRecord): Project {
	const result = { ...record, avatarUrl: record.avatarUrl, coverUrl: record.coverUrl };
	if (record.avatarBlob) result.avatarUrl = URL.createObjectURL(record.avatarBlob);
	if (record.coverBlob) result.coverUrl = URL.createObjectURL(record.coverBlob);
	return result;
}

export function toFeedProject(project: Project) {
	return { id: project.id, slug: project.slug, name: project.name, category: project.category, initial: initial(project.name), accentClassName: 'text-primary', avatarUrl: project.avatarUrl };
}

function toRecord(input: ProjectInput, existing?: LocalProjectRecord): LocalProjectRecord {
	const now = new Date().toISOString();
	return {
		...(existing ?? {}), id: existing?.id ?? crypto.randomUUID(), slug: existing?.slug ?? `${slugify(input.name)}-${crypto.randomUUID().slice(0, 8)}`,
		name: input.name.trim(), description: input.description.trim() || null, category: input.category.trim() || 'Other', technology: input.technology.trim() || null,
		status: input.status, creatorId: 'local-user', accentColor: null, avatarUrl: null, coverUrl: null,
		createdAt: existing?.createdAt ?? now, updatedAt: now,
		...(input.avatarFile ? { avatarBlob: input.avatarFile, avatarMimeType: input.avatarFile.type, avatarFileName: input.avatarFile.name } : {}),
		...(input.coverFile ? { coverBlob: input.coverFile, coverMimeType: input.coverFile.type, coverFileName: input.coverFile.name } : {}),
	};
}

export async function createProject(input: ProjectInput) { const record = toRecord(input); await localDb.projects.add(record); return hydrate(record); }
export async function listProjects() { return (await localDb.projects.orderBy('updatedAt').reverse().toArray()).map(hydrate); }
export async function getProjectById(id: string) { const record = await localDb.projects.get(id); return record ? hydrate(record) : undefined; }
export async function updateProject(id: string, input: ProjectInput) { const existing = await localDb.projects.get(id); if (!existing) throw new Error('Project not found'); const record = toRecord(input, existing); await localDb.projects.put(record); return hydrate(record); }
export async function deleteProject(id: string) { await localDb.transaction('rw', [localDb.projects, localDb.publishedPosts], async () => { await localDb.projects.delete(id); const posts = await localDb.publishedPosts.where('projectId').equals(id).toArray(); await Promise.all(posts.map((record) => localDb.publishedPosts.put({ ...record, projectId: null, post: { ...record.post, project: null } }))); }); }
export async function clearProjects() { await localDb.projects.clear(); }
