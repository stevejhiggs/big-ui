'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerAuthClient } from '../../index';
import { formSchema } from './schema';

export async function signUpAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return redirect('/sign-up?message=Could not authenticate user');
  }

  const origin = (await headers()).get('origin');
  const supabase = await createServerAuthClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/sign-up?message=Could not authenticate user');
  }

  return redirect('/sign-up?message=Check email to continue sign in process');
}
