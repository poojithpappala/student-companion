"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch user data and redirect based on user.stage
    // For this mock, we'll default to the 'before' dashboard.
    router.replace('/dashboard/before');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <p>Loading your dashboard...</p>
    </div>
  );
}
