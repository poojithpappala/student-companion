
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Logo } from "@/components/logo";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  { href: "/dashboard/before", icon: <Rocket />, label: "Before Undergrad" },
  { href: "/dashboard/during", icon: <School />, label: "During Undergrad" },
  { href: "/dashboard/after", icon: <Briefcase />, label: "After Undergrad" },
];

const tools = [
    { href: "/dashboard/resume-analyzer", icon: <FileText />, label: "Resume Analyzer" },
    { href: "/dashboard/salary-negotiator", icon: <BadgeCent />, label: "Salary Negotiator" },
    { href: "/dashboard/company-insights", icon: <Building2 />, label: "Company Insights" },
]

export function DashboardSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const closeSidebar = () => setOpenMobile(false);

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="text-xs text-muted-foreground px-2">Dashboards</span>
          </SidebarMenuItem>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname.startsWith(item.href)}
                  onClick={closeSidebar}
                  tooltip={{
                    children: item.label
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem>
                <span className="text-xs text-muted-foreground px-2">Tools</span>
            </SidebarMenuItem>
            {tools.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    onClick={closeSidebar}
                    tooltip={{
                        children: item.label
                    }}
                    >
                    {item.icon}
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarSeparator />
         <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard/settings" passHref legacyBehavior>
                <SidebarMenuButton as="a" isActive={pathname === "/dashboard/settings"} onClick={closeSidebar}>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
         </SidebarMenu>
         <div className="flex items-center gap-3 p-2 rounded-lg">
             <Avatar>
                 <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person profile" />
                 <AvatarFallback>U</AvatarFallback>
             </Avatar>
             <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                 <p className="font-semibold text-sm truncate">User Name</p>
                 <p className="text-xs text-muted-foreground truncate">user.name@example.com</p>
             </div>
             <Link href="/" className="group-data-[collapsible=icon]:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <LogOut className="h-4 w-4"/>
                </Button>
             </Link>
         </div>
      </SidebarFooter>
    </>
  );
}
