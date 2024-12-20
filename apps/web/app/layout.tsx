import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@repo/tailwind/styles/globals.css';
import './globals.css';
import { AnalyticsListener } from '@repo/analytics';
import { TooltipProvider } from '@repo/shadcn';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnalyticsListener />
      <TooltipProvider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
        </html>
      </TooltipProvider>
    </>
  );
}
