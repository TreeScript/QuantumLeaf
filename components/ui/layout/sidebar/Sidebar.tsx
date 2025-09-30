"use client"

import { useEffect } from "react"
import { useSidebarStore } from "@/stores/ui/sidebar.store"
import SidebarNav from "./SidebarNav"
import clsx from "clsx"
import { 
    LuChevronLeft, 
    LuChevronRight,
    LuX
} from "react-icons/lu"

export default function Sidebar() {
    const { 
        isOpen, 
        isCollapsed, 
        closeSidebar, 
        toggleCollapse,
        setCollapsed 
    } = useSidebarStore()
    
    // 화면 크기에 따른 자동 조정
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // 데스크톱에서는 항상 표시
                setCollapsed(false)
            }
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setCollapsed])
    
    // ESC 키로 사이드바 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeSidebar()
            }
        }
        
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeSidebar])
    
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={closeSidebar}
                />
            )}
            <aside
                className={clsx(
                    "fixed left-0 top-0 z-50 h-full flex flex-col",
                    "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md",
                    "border-r border-slate-200/50 dark:border-slate-700/50",
                    "shadow-xl transition-all duration-300 ease-in-out",
                    // 모바일
                    "md:relative md:z-auto md:shadow-none",
                    // 너비 조정
                    isCollapsed ? "w-16" : "w-64",
                    // 모바일에서 열림/닫힘
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* 헤더 */}
                <div className={clsx(
                    "flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-700/50",
                    isCollapsed && "justify-center"
                )}>
                    {!isCollapsed && (
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            메뉴
                        </h2>
                    )}
                    
                    <div className="flex items-center gap-1">
                        <button
                            onClick={toggleCollapse}
                            className={clsx(
                                "hidden md:flex items-center justify-center",
                                "h-8 w-8 rounded-lg text-slate-500 dark:text-slate-400",
                                "hover:bg-slate-100 dark:hover:bg-slate-800",
                                "transition-colors duration-200",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            )}
                            aria-label={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
                        >
                            {isCollapsed ? (
                                <LuChevronRight className="h-4 w-4" />
                            ) : (
                                <LuChevronLeft className="h-4 w-4" />
                            )}
                        </button>
                        
                        <button
                            onClick={closeSidebar}
                            className={clsx(
                                "md:hidden flex items-center justify-center",
                                "h-8 w-8 rounded-lg text-slate-500 dark:text-slate-400",
                                "hover:bg-slate-100 dark:hover:bg-slate-800",
                                "transition-colors duration-200",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            )}
                            aria-label="사이드바 닫기"
                        >
                            <LuX className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <SidebarNav />
                <div className={clsx(
                    "p-4 border-t border-slate-200/50 dark:border-slate-700/50",
                    isCollapsed && "px-2"
                )}>
                    {!isCollapsed ? (
                        <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                            Quantum Leaf
                        </div>
                    ) : (
                        <div className="h-2 w-2 mx-auto rounded-full bg-slate-300 dark:bg-slate-600" />
                    )}
                </div>
            </aside>
        </>
    )
}
