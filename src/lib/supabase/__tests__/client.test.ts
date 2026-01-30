import { beforeEach, describe, expect, it, vi } from 'vitest'

const createBrowserClientMock = vi.fn(() => ({ kind: 'browser' }))

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: createBrowserClientMock,
}))

const ORIGINAL_ENV = { ...process.env }

describe('createSupabaseBrowserClient', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV }
    createBrowserClientMock.mockClear()
  })

  it('throws when Supabase env is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const { createSupabaseBrowserClient } = await import('../client')

    expect(() => createSupabaseBrowserClient()).toThrow('Missing Supabase environment variables')
  })

  it('returns client when env is present', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'

    const { createSupabaseBrowserClient } = await import('../client')

    const client = createSupabaseBrowserClient()

    expect(client).toEqual({ kind: 'browser' })
    expect(createBrowserClientMock).toHaveBeenCalledWith(
      'https://example.supabase.co',
      'anon-key'
    )
  })
})
