import { login } from '@repo/auth';
import { AuthForm, type AuthFormValues } from '@repo/auth/components';
import { useRouter } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/start';
import { useMutation } from '../hooks/useMutation';
import { signupFn } from '../routes/signup';

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

export function Login() {
  const router = useRouter();

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        router.navigate({ to: '/' });
        return;
      }
    },
  });

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <AuthForm
      actionText="Login"
      status={loginMutation.status}
      onSubmitHandler={(values: AuthFormValues) => {
        loginMutation.mutate({
          data: {
            email: values.email,
            password: values.password,
          },
        });
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
            {loginMutation.data.error && loginMutation.data.message === 'Invalid login credentials' ? (
              <div>
                <button
                  className="text-blue-500"
                  onClick={(e) => {
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    const formData = new FormData((e.target as HTMLButtonElement).form!);

                    signupMutation.mutate({
                      data: {
                        email: formData.get('email') as string,
                        password: formData.get('password') as string,
                      },
                    });
                  }}
                  type="button"
                >
                  Sign up instead?
                </button>
              </div>
            ) : null}
          </>
        ) : null
      }
    />
  );
}
