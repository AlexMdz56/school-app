"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { useSidebarStore } from "@/stores/useSidebarStore"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useHasHydrated } from "@/hooks/useHasHydrated"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const hasHydrated = useHasHydrated()
  const pathname = usePathname()
  const { toggleSection, isSectionOpen, openSection } = useSidebarStore()

  useEffect(() => {
    if (!hasHydrated) return
    const current = items.find((item) => pathname.startsWith(item.url))
    if (current) {
      openSection(current.title)
    }
  }, [pathname, items, openSection, hasHydrated]);

  if (!hasHydrated) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administador</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = isSectionOpen(item.title);

          return (
            <Collapsible key={item.title} asChild open={isOpen}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction
                        className="data-[state=open]:rotate-90"
                        onClick={() =>
                          toggleSection(item.title)
                        }
                      >
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
