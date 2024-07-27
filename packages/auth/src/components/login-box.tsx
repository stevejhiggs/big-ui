'use client';

import { Checkbox, Input, Label } from '@repo/shadcn';
import { SubmitButton } from '@repo/ui';
import Link from 'next/link';
import { signIn, signUp } from './actions';

export function LoginBox({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
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
          <SubmitButton formAction={signIn} pendingText="Signing Up..." className='className="flex w-full'>
            Login
          </SubmitButton>
        </div>
        <div>
          <SubmitButton formAction={signUp} variant={'outline'} pendingText="Signing Up..." className='className="flex w-full'>
            Sign Up
          </SubmitButton>
        </div>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}
