
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ConnectPage() {
  const router = useRouter();

  useEffect(() => {
    // Default to the hackathons page
    router.replace('/dashboard/connect/hackathons');
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="ml-4">Loading connections...</p>
    </div>
  );
}
