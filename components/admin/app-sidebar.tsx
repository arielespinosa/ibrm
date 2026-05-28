"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Mic,
  BookOpen,
  Library,
  Video,
  Users,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Church,
} from "lucide-react";
import { IconFileAi, IconFolder, IconInnerShadowTop, IconReport, IconSettings, IconUsers } from "@tabler/icons-react";
import { NavMain } from "../nav-main";
import { NavSecondary } from "../nav-secondary";
import { NavUser } from "../nav-user";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Sermones",
    icon: Mic,
    href: "/admin/sermons",
  },
  {
    title: "Estudios",
    icon: BookOpen,
    href: "/admin/studies",
  },
  {
    title: "Series",
    icon: Library,
    href: "/admin/series",
  },
  {
    title: "Clases",
    icon: Video,
    href: "/admin/classes",
  },
  {
    title: "Personas",
    icon: Users,
    href: "/admin/people",
  },
  {
    title: "Eventos",
    icon: Calendar,
    href: "/admin/events",
  },
  {
    title: "Blog",
    icon: FileText,
    href: "/admin/blog",
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/admin",
    },
    {
      title: "Sermones",
      icon: Mic,
      url: "/admin/sermons",
    },
    {
      title: "Estudios",
      icon: BookOpen,
      url: "/admin/studies",
    },
    {
      title: "Series",
      icon: Library,
      url: "/admin/series",
    },
    {
      title: "Clases",
      icon: Video,
      url: "/admin/classes",
    },
    {
      title: "Personas",
      icon: Users,
      url: "/admin/people",
    },
    {
      title: "Eventos",
      icon: Calendar,
      url: "/admin/events",
    },
    {
      title: "Blog",
      icon: FileText,
      url: "/admin/blog",
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/admin/settings",
      icon: IconSettings,
    }
  ],
  documents: [

    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
  ],
}

export default function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">IBRM Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data?.navMain || []} />
        <NavSecondary items={data?.navSecondary || []} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
       <SidebarRail  />
    </Sidebar>
  )
}