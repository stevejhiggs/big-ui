import { createServerClient } from '@repo/supabase';
import { parseCookies, setCookie } from 'vinxi/http';

export function createServerAuthClient() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      // @ts-ignore Wait till Supabase overload works
      getAll() {
        return Object.entries(parseCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookies) {
        // biome-ignore lint/complexity/noForEach: <explanation>
        cookies.forEach((cookie) => {
          setCookie(cookie.name, cookie.value);
        });
      },
    },
  });
}
