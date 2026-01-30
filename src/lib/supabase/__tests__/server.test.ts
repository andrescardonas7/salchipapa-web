import { beforeEach, describe, expect, it, vi } from 'vitest';

const createServerClientMock = vi.fn(() => ({ kind: 'server' }));
const cookiesMock = vi.fn();

vi.mock('@supabase/ssr', () => ({
  createServerClient: createServerClientMock,
}));

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

const ORIGINAL_ENV = { ...process.env };

describe('createSupabaseServerClient', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    createServerClientMock.mockClear();
    cookiesMock.mockClear();
  });

  it('throws when Supabase env is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const { createSupabaseServerClient } = await import('../server');

    await expect(createSupabaseServerClient()).rejects.toThrow(
      'Missing Supabase environment variables'
    );
  });

  it('returns client when env is present', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key';

    cookiesMock.mockResolvedValue({
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    });

    const { createSupabaseServerClient } = await import('../server');

    const client = await createSupabaseServerClient();

    expect(client).toEqual({ kind: 'server' });
    expect(createServerClientMock).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'anon-key',
      expect.any(Object)
    );
  });
});
