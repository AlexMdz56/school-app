"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  School,
  Send,
  Timer,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useSidebarStore } from "@/stores/useToggleSidebarStore"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Alumnos",
      url: "#",
      icon: User,
      items: [
        {
          title: "Ver",
          url: "/alumnos",
        },
        {
          title: "Crear",
          url: "/alumnos/nuevo-alumno",
        },
      ],
    },
    {
      title: "Mestros",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Ver",
          url: "/maestros",
        },
        {
          title: "Crear",
          url: "/maestros/nuevo-maestro",
        },
      ],
    },
    {
      title: "Materias",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Ver",
          url: "/materias",
        },
        {
          title: "Crear",
          url: "/materias/nueva-materia",
        },
      ],
    },
    {
      title: "Salones",
      url: "#",
      icon: School,
      items: [
        {
          title: "Ver",
          url: "/salones",
        },
        {
          title: "Crear",
          url: "/salones/nuevo-salon",
        },
      ],
    },
    {
      title: "Horarios",
      url: "#",
      icon: Timer,
      items: [
        {
          title: "Ver",
          url: "/horarios",
        },
        {
          title: "Crear",
          url: "/horarios/nuevo-horario",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isOpen = useSidebarStore(state => state.isOpen);
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden h-full",
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      )}
      collapsible="none"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Mi Escuela</span>
                  <span className="truncate text-xs">Sistema</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
