import { describe, expect, it } from 'vitest';

import { isAllowedEmail } from '../email';

describe('isAllowedEmail', () => {
  it('accepts exact allowed domains', () => {
    expect(isAllowedEmail('user@gmail.com')).toBe(true);
    expect(isAllowedEmail('user@outlook.com')).toBe(true);
    expect(isAllowedEmail('user@icloud.com')).toBe(true);
  });

  it('accepts .edu and .edu.xx domains', () => {
    expect(isAllowedEmail('user@harvard.edu')).toBe(true);
    expect(isAllowedEmail('user@uni.edu.co')).toBe(true);
    expect(isAllowedEmail('user@uni.edu.mx')).toBe(true);
  });

  it('rejects non-allowed domains', () => {
    expect(isAllowedEmail('user@yahoo.com')).toBe(false);
    expect(isAllowedEmail('user@company.com')).toBe(false);
  });

  it('rejects invalid emails', () => {
    expect(isAllowedEmail('')).toBe(false);
    expect(isAllowedEmail('user')).toBe(false);
    expect(isAllowedEmail('user@')).toBe(false);
    expect(isAllowedEmail('@domain.com')).toBe(false);
  });
});
