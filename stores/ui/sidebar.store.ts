import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
    isOpen: boolean
    isCollapsed: boolean
    
    toggleSidebar: () => void
    openSidebar: () => void
    closeSidebar: () => void
    toggleCollapse: () => void
    setCollapsed: (collapsed: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            isOpen: false,
            isCollapsed: false,
            
            toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
            openSidebar: () => set({ isOpen: true }),
            closeSidebar: () => set({ isOpen: false }),
            toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
            setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
        }),
        {
            name: "sidebar-storage",
            partialize: (state) => ({ isCollapsed: state.isCollapsed })
        }
    )
)
