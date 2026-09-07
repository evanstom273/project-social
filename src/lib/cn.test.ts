import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/cn';

describe('cn', () => {
  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-2', 'px-4', 'text-primary')).toBe('px-4 text-primary');
  });
});
