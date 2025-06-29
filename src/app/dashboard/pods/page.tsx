
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePodStore } from '@/hooks/use-pod-store';
import { Loader2 } from 'lucide-react';

export default function PodsPage() {
  const router = useRouter();
  const { currentPod } = usePodStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Redirect based on whether the user is in a pod
    if (isMounted) {
        if (currentPod) {
            router.replace('/dashboard/pods/my-pod');
        } else {
            router.replace('/dashboard/pods/find');
        }
    }
  }, [currentPod, router, isMounted]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="ml-4">Loading your pods...</p>
    </div>
  );
}
