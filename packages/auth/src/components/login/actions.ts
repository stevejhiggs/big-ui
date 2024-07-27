'use server';

import { redirect } from 'next/navigation';
import { createServerAuthClient } from '../../index';
import { formSchema } from './schema';

export async function signInAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return redirect('/log-in?message=Could not authenticate user');
  }

  const supabase = createServerAuthClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return redirect('/log-in?message=Could not authenticate user');
  }

  return redirect('/protected');
}
