import { SignupForm } from '@repo/auth/components';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create account</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <SignupForm searchParams={searchParams} />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/log-in" className="underline">
              Log-in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image src="/silent-kite.webp" alt="Image" width="1024" height="1024" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
