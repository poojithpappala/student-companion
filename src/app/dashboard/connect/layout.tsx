
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users } from "lucide-react";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab = pathname.includes("peers") ? "peers" : "hackathons";

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="hackathons" asChild>
            <Link href="/dashboard/connect/hackathons">
              <Calendar className="mr-2 h-4 w-4" /> Hackathons
            </Link>
          </TabsTrigger>
          <TabsTrigger value="peers" asChild>
            <Link href="/dashboard/connect/peers">
              <Users className="mr-2 h-4 w-4" /> Collaborators
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-6">{children}</div>
    </div>
  );
}
