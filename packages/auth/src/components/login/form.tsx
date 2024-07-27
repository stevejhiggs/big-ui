'use client';

import { Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, useForm, type z, zodResolver } from '@repo/shadcn';
import { SubmitButton } from '@repo/ui';
import Link from 'next/link';
import { useRef } from 'react';
import { signInAction } from './actions';
import { type FormSchema, formSchema } from './schema';

export function LoginForm({
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
      <form ref={formRef} action={signInAction} className="mx-auto w-full max-w-md space-y-6" onSubmit={form.handleSubmit(() => formRef.current?.submit())}>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 text-primary focus:ring-primary" />
            <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link href="#" className="font-medium text-primary hover:text-primary/90" prefetch={false}>
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <SubmitButton pendingText="Logging in..." className='className="flex w-full'>
            Login
          </SubmitButton>
        </div>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </Form>
  );
}
