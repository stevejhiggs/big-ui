import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export function AnalyticsListener() {
  return (
    <>
      <VercelAnalytics />
    </>
  );
}
