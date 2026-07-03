import { createClient } from '@supabase/supabase-js'

// Fallback placeholders let the app build even before env vars are set in Vercel.
// At runtime with real env vars configured, these are ignored.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
})
