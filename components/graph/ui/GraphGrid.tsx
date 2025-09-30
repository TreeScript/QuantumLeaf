"use client"

import { useEffect, useMemo, useRef } from "react"
import Card from "../../ui/common/card/Card"
import { mapRowsToCards } from "@/features/main/main.mapper"
import { useTranslation } from "@/lib/i18n/i18n-client"
import { useGraphData } from "@/hooks/graph/useGraphData"
import { useGraphRealtime } from "@/hooks/graph/useGraphRealtime"

export default function GraphGrid() {
    const { t } = useTranslation()
    const sentinelRef = useRef<HTMLDivElement | null>(null)
    
    // 캐시된 그래프 데이터 사용
    const {
        items,
        hasMore,
        isLoading,
        error,
        loadNextPage
    } = useGraphData()
    
    // 실시간 동기화 활성화
    useGraphRealtime()

    // Intersection Observer를 사용한 무한 스크롤
    useEffect(() => {
        if (!sentinelRef.current) return
        const element = sentinelRef.current

        const io = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && hasMore && !isLoading) {
                    loadNextPage()
                }
            },
            { root: null, rootMargin: "800px", threshold: 0 }
        )
        io.observe(element)
        
        return () => io.unobserve(element)
    }, [hasMore, isLoading, loadNextPage])

    const cards = useMemo(() => mapRowsToCards(items), [items])

    return (
        <div className="w-full">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10 auto-rows-fr">
                    {cards.map((card) => (
                        <div key={card.slug} className="h-full">
                            <Card 
                                {...card}
                            />
                        </div>
                    ))}

                    {isLoading &&
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={`skeleton-${i}`} 
                                className="h-40 animate-pulse rounded-2xl border border-gray-200/70 bg-gray-100/60"
                            />
                        ))}
                </div>

                {error && (
                    <p className="mt-4 text-sm text-red-600">
                       {`${t("main.graph_grind.get_data_error")}`} {error.message}
                    </p>
                )}
                <div ref={sentinelRef} className="h-10" />
                {!hasMore && !isLoading && items.length > 0 && (
                    <p className="mt-6 text-center text-sm text-gray-500">
                        {`${t("main.graph_grid.no_more_data")}`}
                    </p>
                )}
            </div>
        </div>
    )
}