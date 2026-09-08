import { describe, expect, it } from 'vitest';
import { isValidHandle, normalizeHandle } from './profiles';

describe('profile handles', () => {
  it('normalizes handles case-insensitively', () => expect(normalizeHandle('@Maker_Alex')).toBe('maker_alex'));
  it('accepts sensible public handles', () => expect(isValidHandle('maker_alex')).toBe(true));
  it('rejects handles with spaces or punctuation', () => { expect(isValidHandle('maker alex')).toBe(false); expect(isValidHandle('ab')).toBe(false); });
});
