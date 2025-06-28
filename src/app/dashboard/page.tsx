"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Since there's no logged-in user, redirect to a default dashboard.
    // The 'during' undergrad dashboard is a sensible default.
    router.replace('/dashboard/during');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="ml-4">Loading your dashboard...</p>
    </div>
  );
}
