
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    flowType: 'pkce', // Using PKCE flow for added security
    detectSessionInUrl: true,
    storage: localStorage, // Use localStorage for session persistence
  },
  global: {
    headers: {
      'X-Content-Type-Options': 'nosniff', // Security header to prevent MIME type sniffing
    },
  },
});
