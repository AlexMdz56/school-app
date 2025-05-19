"use client"

import { SidebarIcon } from "lucide-react"
// import Link from "next/link"
import { usePathname } from "next/navigation"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import { useSidebar } from "@/components/ui/sidebar"
import React from "react"
import { useSidebarStore } from "@/stores/useToggleSidebarStore"
import { ThemeToggle } from "./theme/theme-toggle"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, " ")
}

export function SiteHeader() {
  // const { toggleSidebar } = useSidebar()
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const pathname = usePathname()

  const segments = pathname
    .split("/")
    .filter(Boolean) // elimina strings vacíos
    .map(capitalize)

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/").toLowerCase()
              const isLast = index === segments.length - 1

              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Iniciar sesión
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
