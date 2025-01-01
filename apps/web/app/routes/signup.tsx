import { signup } from '@repo/auth';
import { AuthForm, type AuthFormValues } from '@repo/auth/components';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/start';
import { useMutation } from '../hooks/useMutation';

export const signupFn = createServerFn()
  .validator((d: unknown) => d as { email: string; password: string; redirectUrl?: string })
  .handler(async ({ data }) => {
    const error = await signup(data);
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      href: data.redirectUrl || '/',
    });
  });

export const Route = createFileRoute('/signup')({
  component: SignupComp,
});

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  });

  return (
    <AuthForm
      actionText="Sign Up"
      status={signupMutation.status}
      onSubmitHandler={(values: AuthFormValues) => {
        signupMutation.mutate({
          data: {
            email: values.email,
            password: values.password,
          },
        });
      }}
      afterSubmit={
        signupMutation.data?.error ? (
          <>
            <div className="text-red-400">{signupMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
