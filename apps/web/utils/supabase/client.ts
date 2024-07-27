import { createBrowserClient } from '@repo/supabase';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const createClient = () => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
