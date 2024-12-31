import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import { Meta, Scripts, createServerFn } from '@tanstack/start';
import { type ReactNode, Suspense, lazy } from 'react';

import globalCss from '@/styles/globals.css?url';
import { getSupabaseServerClient } from '@/utils/supabase';
import { TooltipProvider } from '@repo/shadcn';
import tailwindCss from '@repo/tailwind/styles/globals.css?url';
import type { User } from '@supabase/auth-js';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = await getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return data.user;
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; user?: User }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      { rel: 'stylesheet', href: tailwindCss },
      { rel: 'stylesheet', href: globalCss },
    ],
  }),
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
