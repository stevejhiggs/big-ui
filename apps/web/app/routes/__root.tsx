import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Meta, Scripts, createServerFn } from '@tanstack/react-start';
import { type ReactNode, Suspense, lazy } from 'react';

import { type User, getUser } from '@repo/auth';
import { TooltipProvider } from '@repo/ui/components/base/tooltip';

import globalCss from '@/styles/globals.css?url';

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
  const user = await getUser();
  return user;
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
    links: [{ rel: 'stylesheet', href: globalCss }],
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
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
