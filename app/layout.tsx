import { ThemeProvider } from "@/components/theme/theme-provider"
import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Footer } from "@/components/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export const metadata: Metadata = {
  title: "Mi Escuela",
  description: "WebApp para gestionar mi escuela",
  icons: {
    icon: "/favicon.ico",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="[--header-height:calc(--spacing(14))]">
              <ConvexClientProvider>
                <SidebarProvider className="flex flex-col">
                  <SiteHeader />
                  <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                      <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                      </div>
                    </SidebarInset>
                  </div>
                  <Footer />
                </SidebarProvider>
              </ConvexClientProvider>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}