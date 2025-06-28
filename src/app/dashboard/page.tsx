"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading && userProfile) {
      if (userProfile.stage) {
        // Pass careerId if it exists to the dashboard
        const url = userProfile.careerId 
          ? `/dashboard/${userProfile.stage}?careerId=${userProfile.careerId}`
          : `/dashboard/${userProfile.stage}`;
        router.replace(url);
      } else {
        // If stage is somehow missing, send back to onboarding
        router.replace('/onboarding/stage');
      }
    }
  }, [userProfile, loading, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="ml-4">Loading your dashboard...</p>
    </div>
  );
}
