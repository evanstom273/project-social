import { describe, expect, it } from 'vitest';

import {
  formatPostHierarchyLabel,
  getMaxVideoDurationLabel,
  isVideoDurationAllowed,
} from '@/domain/rules';
import { MAX_VIDEO_DURATION_SECONDS } from '@/config/constants';

describe('domain rules', () => {
  it('prefers project-first hierarchy when a post has a project', () => {
    expect(formatPostHierarchyLabel(true)).toBe('project-first');
    expect(formatPostHierarchyLabel(false)).toBe('creator-first');
  });

  it('enforces the short-video duration limit', () => {
    expect(isVideoDurationAllowed(30)).toBe(true);
    expect(isVideoDurationAllowed(MAX_VIDEO_DURATION_SECONDS)).toBe(true);
    expect(isVideoDurationAllowed(MAX_VIDEO_DURATION_SECONDS + 1)).toBe(false);
    expect(isVideoDurationAllowed(0)).toBe(false);
  });

  it('exposes a human-readable max duration label', () => {
    expect(getMaxVideoDurationLabel()).toBe('60 seconds');
  });
});
