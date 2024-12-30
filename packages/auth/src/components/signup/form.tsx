'use client';

import { Input } from '@repo/shadcn';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm, zodResolver } from '@repo/shadcn/components/form.tsx';
import { SubmitButton } from '@repo/ui';
import { useRef } from 'react';
import { signUpAction } from './actions';
import { type FormSchema, formSchema } from './schema';

export function SignupForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form ref={formRef} action={signUpAction} className="mx-auto w-full max-w-md space-y-6" onSubmit={form.handleSubmit(() => formRef.current?.submit())}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <SubmitButton formAction={signUpAction} pendingText="Creating account..." className='className="flex w-full'>
            Create account
          </SubmitButton>
        </div>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </Form>
  );
}
