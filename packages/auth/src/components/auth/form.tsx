import { Button, Input } from '@repo/shadcn';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm, zodResolver } from '@repo/shadcn/components/form';
import { useRef } from 'react';
import type { z } from 'zod';
import { type FormSchema, formSchema } from './schema';

export type AuthFormValues = z.infer<typeof formSchema>;

export function AuthForm({
  actionText,
  onSubmitHandler,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmitHandler: (values: AuthFormValues) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: React.ReactNode;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(values: AuthFormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    onSubmitHandler(values);
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-md space-y-6">
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
        <Button type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? '...' : actionText}
        </Button>
        {afterSubmit ? afterSubmit : null}
      </form>
    </Form>
  );
}
