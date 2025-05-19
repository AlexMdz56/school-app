// stores/sidebar-store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type SidebarState = {
  isOpen: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true, // por defecto abierto
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open: boolean) => set({ isOpen: open }),
    }),
    {
      name: "sidebar-storage", // nombre en localStorage
    }
  )
)
