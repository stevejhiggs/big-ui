import { z } from '@repo/shadcn/components/form.tsx';

export type FormSchema = z.infer<typeof formSchema>;

export const formSchema = z.object({
  email: z.string().trim().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().trim().min(5, {
    message: 'Password must be at least 5 characters.',
  }),
});
