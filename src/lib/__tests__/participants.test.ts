import { describe, expect, it } from 'vitest';

import { getParticipantLogoUrl } from '../participants';

describe('getParticipantLogoUrl', () => {
  it('returns imageUrl when provided', () => {
    expect(
      getParticipantLogoUrl({ slug: 'foo', imageUrl: 'https://cdn/img.png' })
    ).toBe('https://cdn/img.png');
  });

  it('returns mapped participants filename when known', () => {
    expect(getParticipantLogoUrl({ slug: 'qarepa', imageUrl: null })).toBe(
      '/participants/Q-arepa.svg'
    );
    expect(getParticipantLogoUrl({ slug: 'jyc', imageUrl: null })).toBe(
      '/participants/j-c.svg'
    );
    expect(getParticipantLogoUrl({ slug: 'el-cerdito', imageUrl: null })).toBe(
      '/participants/El-cerdito.svg'
    );
    expect(
      getParticipantLogoUrl({ slug: 'burger-shake', imageUrl: null })
    ).toBe('/participants/Burguer-shake.svg');
    expect(
      getParticipantLogoUrl({ slug: 'doriexplosion', imageUrl: null })
    ).toBe('/participants/Doriexplosion.png');
  });

  it('returns fallback when imageUrl is null', () => {
    expect(getParticipantLogoUrl({ slug: 'foo', imageUrl: null })).toBe(
      '/participants/foo.svg'
    );
  });

  it('returns fallback when imageUrl is empty/blank', () => {
    expect(getParticipantLogoUrl({ slug: 'foo', imageUrl: '' })).toBe(
      '/participants/foo.svg'
    );
    expect(getParticipantLogoUrl({ slug: 'bar', imageUrl: '   ' })).toBe(
      '/participants/bar.svg'
    );
  });
});
