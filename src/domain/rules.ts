import { MAX_VIDEO_DURATION_SECONDS } from '@/config/constants';

export function formatPostHierarchyLabel(hasProject: boolean): 'project-first' | 'creator-first' {
  return hasProject ? 'project-first' : 'creator-first';
}

export function isVideoDurationAllowed(durationSeconds: number): boolean {
  return durationSeconds > 0 && durationSeconds <= MAX_VIDEO_DURATION_SECONDS;
}

export function getMaxVideoDurationLabel(): string {
  return `${MAX_VIDEO_DURATION_SECONDS} seconds`;
}
