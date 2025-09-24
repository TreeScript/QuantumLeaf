"use client"

import { useTranslation } from "@/lib/i18n/i18n-client"
import { usePathname } from "next/navigation"
import LocaleLink from "../../common/i18n/LocaleLink"
import { buildMainNavLinks, matchActive } from "@/lib/nav/headerNav"
import { useSidebarStore } from "@/stores/ui/sidebar.store"
import clsx from "clsx"
import { 
    LuHome, 
    LuInfo, 
    LuFileText, 
    LuBarChart3,
    LuChevronRight
} from "react-icons/lu"

const navIcons = {
    home: LuHome,
    introduce: LuInfo,
    document: LuFileText,
    graph: LuBarChart3,
}

export default function SidebarNav() {
    const { t } = useTranslation()
    const pathname = usePathname()
    const { isCollapsed, closeSidebar } = useSidebarStore()
    
    const navLinks = buildMainNavLinks(t)
    
    // 그래프 링크 추가
    const allLinks = [
        ...navLinks,
        {
            key: "graph" as const,
            href: "/main/graph/new",
            label: t("header.link.graph")
        }
    ]
    
    const handleLinkClick = () => {
        // 모바일에서 링크 클릭 시 사이드바 닫기
        if (window.innerWidth < 768) {
            closeSidebar()
        }
    }
    
    return (
        <nav className="flex-1 px-3 py-6">
            <ul className="space-y-2">
                {allLinks.map((link) => {
                    const isActive = matchActive(pathname, link.href)
                    const Icon = navIcons[link.key as keyof typeof navIcons] || LuFileText
                    
                    return (
                        <li key={link.href}>
                            <LocaleLink
                                href={link.href}
                                onClick={handleLinkClick}
                                className={clsx(
                                    "group relative flex items-center rounded-xl px-3 py-2.5",
                                    "text-sm font-medium transition-all duration-200",
                                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                                    isCollapsed ? "justify-center" : "justify-start"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Icon className={clsx(
                                    "h-5 w-5 flex-shrink-0",
                                    isActive 
                                        ? "text-blue-600 dark:text-blue-400" 
                                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300",
                                    !isCollapsed && "mr-3"
                                )} />
                                
                                {!isCollapsed && (
                                    <>
                                        <span className="truncate">{link.label}</span>
                                        {isActive && (
                                            <LuChevronRight className="ml-auto h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        )}
                                    </>
                                )}
                                
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-600 dark:bg-blue-400" />
                                )}
                            </LocaleLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
