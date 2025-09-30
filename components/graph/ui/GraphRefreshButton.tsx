"use client"

import { RefreshCw } from "lucide-react"
import { useGraphCache } from "@/hooks/graph/useGraphCache"
import { useTranslation } from "@/lib/i18n/i18n-client"
import { useState } from "react"

interface GraphRefreshButtonProps {
    variant?: 'full' | 'icon-only'
    className?: string
}

export default function GraphRefreshButton({ 
    variant = 'full', 
    className = '' 
}: GraphRefreshButtonProps) {
    const { t } = useTranslation()
    const { invalidateCache } = useGraphCache()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleRefresh = async () => {
        if (isRefreshing) return
        
        setIsRefreshing(true)
        try {
            await invalidateCache()
        } catch (error) {
            console.error("Failed to refresh graph data:", error)
        } finally {
            setIsRefreshing(false)
        }
    }

    if (variant === 'icon-only') {
        return (
            <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`
                    inline-flex items-center justify-center w-8 h-8
                    rounded-lg border border-gray-300 bg-white hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors duration-200
                    ${className}
                `}
                title={`${t("common.buttons.refresh")} (수동)`}
            >
                <RefreshCw 
                    className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                />
            </button>
        )
    }

    return (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
                inline-flex items-center gap-2 px-3 py-2 text-sm font-medium
                rounded-lg border border-gray-300 bg-white hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
                ${className}
            `}
            title={`${t("common.buttons.refresh")} (수동)`}
        >
            <RefreshCw 
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            {t("common.buttons.refresh")}
        </button>
    )
}
