"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

const GRAPH_QUERY_KEY = ['graphs'] as const

/**
 * 그래프 캐시 관리를 위한 훅
 */
export function useGraphCache() {
    const queryClient = useQueryClient()

    // 캐시 무효화
    const invalidateCache = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: GRAPH_QUERY_KEY })
    }, [queryClient])

    // 캐시 완전 제거
    const removeCache = useCallback(() => {
        queryClient.removeQueries({ queryKey: GRAPH_QUERY_KEY })
    }, [queryClient])

    // 캐시 새로고침 (무효화 + 다시 패칭)
    const refreshCache = useCallback(async () => {
        await queryClient.refetchQueries({ queryKey: GRAPH_QUERY_KEY })
    }, [queryClient])

    return {
        invalidateCache,
        removeCache,
        refreshCache
    }
}
