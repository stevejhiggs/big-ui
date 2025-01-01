import { createFileRoute, useLoaderData, useRouteContext } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return <div>Hello {user?.email}</div>;
}
