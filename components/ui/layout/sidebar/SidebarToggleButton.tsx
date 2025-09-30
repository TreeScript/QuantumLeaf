"use client"

import { useSidebarStore } from "@/stores/ui/sidebar.store"
import { LuMenu, LuX } from "react-icons/lu"
import clsx from "clsx"

export default function SidebarToggleButton() {
    const { isOpen, toggleSidebar } = useSidebarStore()
    
    return (
        <button
            onClick={toggleSidebar}
            className={clsx(
                "fixed top-4 left-4 z-50 flex items-center justify-center",
                "h-10 w-10 rounded-xl border border-white/10 backdrop-blur-md",
                "bg-white/90 dark:bg-slate-900/90 shadow-lg",
                "text-slate-700 dark:text-slate-300",
                "transition-all duration-200 hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                "md:hidden"
            )}
            aria-label={isOpen ? "사이드바 닫기" : "사이드바 열기"}
        >
            {isOpen ? (
                <LuX className="h-5 w-5" />
            ) : (
                <LuMenu className="h-5 w-5" />
            )}
        </button>
    )
}