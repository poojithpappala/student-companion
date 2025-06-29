
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Zap } from "lucide-react";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  let activeTab = "hackathons";
  if (pathname.includes("peers")) {
    activeTab = "peers";
  } else if (pathname.includes("calendar")) {
    activeTab = "calendar";
  }

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="hackathons" asChild>
            <Link href="/dashboard/connect/hackathons">
              <Zap className="mr-2 h-4 w-4" /> Hackathons
            </Link>
          </TabsTrigger>
          <TabsTrigger value="peers" asChild>
            <Link href="/dashboard/connect/peers">
              <Users className="mr-2 h-4 w-4" /> Peers
            </Link>
          </TabsTrigger>
           <TabsTrigger value="calendar" asChild>
            <Link href="/dashboard/connect/calendar">
              <Calendar className="mr-2 h-4 w-4" /> Calendar
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-6">{children}</div>
    </div>
  );
}
