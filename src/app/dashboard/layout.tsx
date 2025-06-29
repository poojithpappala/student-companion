
"use client";

import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/shared/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header";
import { AiChatbot } from "@/components/dashboard/shared/ai-chatbot";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <DashboardSidebar />
        </Sidebar>
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in-up">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </SidebarInset>
        <AiChatbot />
      </div>
    </SidebarProvider>
  );
}
