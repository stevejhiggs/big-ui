import { login } from '@repo/auth';
import { AuthForm, type AuthFormValues } from '@repo/auth/components';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
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

export function Login() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx?.error) {
        await router.invalidate();
        router.navigate({ to: '/' });
        return;
      }
    },
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
          </>
        ) : null
      }
    />
  );
}
