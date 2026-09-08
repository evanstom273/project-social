import { beforeEach, describe, expect, it } from 'vitest';
import { clearProjects, createProject, deleteProject, getProjectById, listProjects, updateProject } from './project-store';
import { localDb } from './db';
import { savePublishedPost } from './published-post-store';

const input = { name: 'Pocket Garden', description: 'A tiny growing app', category: 'Software', technology: 'React', status: 'in-progress' as const };

describe('local projects', () => {
 beforeEach(async () => { await clearProjects(); await localDb.publishedPosts.clear(); });
 it('creates and persists a project', async () => { const project = await createProject(input); expect((await getProjectById(project.id))?.name).toBe('Pocket Garden'); expect((await listProjects()).map((item) => item.id)).toContain(project.id); });
 it('edits a project while preserving its identity', async () => { const project = await createProject(input); const updated = await updateProject(project.id, { ...input, name: 'Pocket Garden 2', status: 'completed' }); expect(updated.id).toBe(project.id); expect(updated.name).toBe('Pocket Garden 2'); expect(updated.status).toBe('completed'); });
 it('unlinks posts instead of deleting them when a project is deleted', async () => { const project = await createProject(input); const post = await savePublishedPost({ postType: 'update', username: 'alex', title: '', body: 'Progress', tagsInput: '', projectId: project.id, projectName: project.name, communityName: '', aiAssisted: false }); await deleteProject(project.id); expect(await getProjectById(project.id)).toBeUndefined(); expect((await localDb.publishedPosts.get(post.id))?.projectId).toBeNull(); expect(await localDb.publishedPosts.get(post.id)).toBeTruthy(); });
});
