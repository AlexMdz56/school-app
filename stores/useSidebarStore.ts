import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarStore = {
  openSections: string[]
  toggleSection: (section: string) => void
  isSectionOpen: (section: string) => boolean
  openSection: (section: string) => void
  // _hasHydrated: boolean
  // setHasHydrated: (state: boolean) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      openSections: [],
      toggleSection: (section) => {
        const current = get().openSections
        if (current.includes(section)) {
          set({ openSections: current.filter((s) => s !== section) })
        } else {
          set({ openSections: [...current, section] })
        }
      },
      isSectionOpen: (section) => get().openSections.includes(section),
      openSection: (section) => {
        const current = get().openSections
        if (!current.includes(section)) {
          set({ openSections: [...current, section] })
        }
      },
      // _hasHydrated: false,
      // setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'sidebar-storage',
      // onRehydrateStorage: () => (state) => {
      //   state?.setHasHydrated(true)
      // },
    }
  )
)
