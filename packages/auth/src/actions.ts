import type { AuthError as SupabaseAuthError, User as SupabaseUser } from '@supabase/auth-js';
import { createServerAuthClient } from './client';

export type User = SupabaseUser;
export type AuthError = SupabaseAuthError;

export async function login({ email, password }: { email: string; password: string }): Promise<AuthError | null> {
  const supabase = createServerAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error;
}

export async function signup({ email, password }: { email: string; password: string }): Promise<AuthError | null> {
  const supabase = createServerAuthClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  return error;
}

export async function logout(): Promise<AuthError | null> {
  const supabase = createServerAuthClient();
  const { error } = await supabase.auth.signOut();

  return error;
}

export async function getUser(): Promise<User | null> {
  const supabase = createServerAuthClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return data.user;
}
