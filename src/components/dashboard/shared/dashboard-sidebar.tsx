"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  School,
  Briefcase,
  FileText,
  BadgeCent,
  Settings,
  LogOut,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  { href: "/dashboard/before", icon: <Rocket />, label: "Before Undergrad", stage: "before" },
  { href: "/dashboard/during", icon: <School />, label: "During Undergrad", stage: "during" },
  { href: "/dashboard/after", icon: <Briefcase />, label: "After Undergrad", stage: "after" },
];

const tools = [
    { href: "/dashboard/resume-analyzer", icon: <FileText />, label: "Resume Analyzer" },
    { href: "/dashboard/salary-negotiator", icon: <BadgeCent />, label: "Salary Negotiator" },
    { href: "/dashboard/company-insights", icon: <Building2 />, label: "Company Insights" },
    { href: "/dashboard/graduate-school-finder", icon: <GraduationCap />, label: "Graduate School Finder" },
]

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setOpenMobile } = useSidebar();

  const pathSegments = pathname.split('/').filter(Boolean);
  const stageFromPath = ['before', 'during', 'after'].find(s => s === pathSegments[1]);
  const currentStage = searchParams.get('stage') || stageFromPath || 'during';

  const closeSidebar = () => setOpenMobile(false);
  
  const handleLogout = () => {
    router.push('/auth');
  };

  // Ensure the stage is always part of the query string for tool pages
  const preservedSearchParams = new URLSearchParams(searchParams);
  if (!preservedSearchParams.has('stage')) {
    preservedSearchParams.set('stage', currentStage);
  }
  const preservedQueryString = preservedSearchParams.toString();

  const activeDashboardItem = menuItems.find(item => item.stage === currentStage);

  return (
    <>
      <SidebarHeader>
        <Logo isWhite />
      </SidebarHeader>
      <SidebarContent>
        {activeDashboardItem && (
          <>
            <SidebarMenu>
              <SidebarMenuItem>
                <span className="text-xs text-muted-foreground px-2">Dashboard</span>
              </SidebarMenuItem>
                <SidebarMenuItem key={activeDashboardItem.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(activeDashboardItem.href)}
                    onClick={closeSidebar}
                    tooltip={{
                      children: activeDashboardItem.label,
                    }}
                  >
                    <Link href={`${activeDashboardItem.href}?${searchParams.toString()}`}>
                      {activeDashboardItem.icon}
                      <span>{activeDashboardItem.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
          </>
        )}
        <SidebarMenu>
            <SidebarMenuItem>
                <span className="text-xs text-muted-foreground px-2">Tools</span>
            </SidebarMenuItem>
            {tools.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    onClick={closeSidebar}
                    tooltip={{
                      children: item.label,
                    }}
                  >
                    <Link href={`${item.href}?${preservedQueryString}`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarSeparator />
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/settings"}
                onClick={closeSidebar}
              >
                <Link href={`/dashboard/settings?${preservedQueryString}`}>
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
         <div className="flex items-center gap-3 p-2 rounded-lg">
             <Avatar>
                 <AvatarImage src={"https://placehold.co/40x40.png"} alt="User avatar" data-ai-hint="person profile" />
                 <AvatarFallback>U</AvatarFallback>
             </Avatar>
             <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                 <p className="font-semibold text-sm truncate">Guest User</p>
                 <p className="text-xs text-muted-foreground truncate">guest@example.com</p>
             </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 group-data-[collapsible=icon]:hidden" onClick={handleLogout}>
                  <LogOut className="h-4 w-4"/>
              </Button>
         </div>
      </SidebarFooter>
    </>
  );
}
