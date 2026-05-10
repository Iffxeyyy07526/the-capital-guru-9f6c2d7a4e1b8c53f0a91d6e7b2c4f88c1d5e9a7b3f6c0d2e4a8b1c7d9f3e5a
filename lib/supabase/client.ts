import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    // Return a dummy client or handle it in the UI
    // During build, this might be called, we just return the client but it will fail at runtime if still missing
    return createBrowserClient(
      url || 'https://placeholder.supabase.co',
      key || 'placeholder'
    );
  }

  return createBrowserClient(url, key);
}
