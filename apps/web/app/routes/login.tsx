import { Login } from '@/components/Login';
import silentKite from '@assets/silent-kite.webp';
import { login } from '@repo/auth';
import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

export const loginFn = createServerFn()
  .validator((d) => d as { email: string; password: string })
  .handler(async ({ data }) => {
    const error = await login(data);

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <Login />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src={silentKite} alt="Kite in blue sky" width="1024" height="1024" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
