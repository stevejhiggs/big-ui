import { createServerAuthClient } from '@repo/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

const logoutFn = createServerFn().handler(async () => {
  const supabase = createServerAuthClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  throw redirect({
    href: '/',
  });
});

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn(),
});
