import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ isWhite = false, className }: { isWhite?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <GraduationCap className={cn("h-7 w-7", isWhite ? "text-white" : "text-primary")} />
      <span
        className={cn(
          "text-xl font-bold font-headline",
          isWhite ? "text-white" : "text-primary"
        )}
      >
        Student Companion
      </span>
    </Link>
  );
}
