"use client"

import { useCallback, useEffect } from "react"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import axiosClient from "@/lib/axios/axiosClient"
import { GraphRow } from "@/features/graph/new/new.types"

type ApiResponse<T> = {
    data: T[]
    page: number
    limit: number
    total: number
    hasMore: boolean
    nextPage: number | null
}

const GRAPH_QUERY_KEY = ['graphs'] as const
const ITEMS_PER_PAGE = 16
const AUTO_REFRESH_INTERVAL = 2 * 60 * 1000 // 2분마다 자동 새로고침

export function useGraphData() {
    const queryClient = useQueryClient()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch
    } = useInfiniteQuery<ApiResponse<GraphRow>, Error>({
        queryKey: GRAPH_QUERY_KEY,
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosClient.get<ApiResponse<GraphRow>>(
                `/api/graph`,
                { params: { page: pageParam, limit: ITEMS_PER_PAGE } }
            )
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 30 * 1000, // 30초간 fresh 상태 유지 (더 자주 업데이트)
        gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
        refetchOnWindowFocus: true, // 윈도우 포커스시 자동 refetch 활성화
        refetchOnMount: true, // 마운트시 자동 refetch 활성화
        refetchInterval: AUTO_REFRESH_INTERVAL, // 2분마다 자동 새로고침
    })

    // 모든 페이지의 데이터를 평면화
    const allItems = data?.pages.flatMap((page: ApiResponse<GraphRow>) => page.data) ?? []
    const totalCount = data?.pages[0]?.total ?? 0
    const hasMore = hasNextPage ?? false

    // 캐시 무효화 및 새로고침
    const invalidateAndRefresh = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: GRAPH_QUERY_KEY })
        return refetch()
    }, [queryClient, refetch])

    // 다음 페이지 로드
    const loadNextPage = useCallback(async () => {
        if (hasNextPage && !isFetchingNextPage) {
            return fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    // 새 그래프 아이템 추가 (낙관적 업데이트)
    const addGraphItem = useCallback((newItem: GraphRow) => {
        queryClient.setQueryData<{ pages: ApiResponse<GraphRow>[] }>(GRAPH_QUERY_KEY, (oldData) => {
            if (!oldData) return oldData
            
            // 첫 번째 페이지 맨 앞에 새 아이템 추가
            const updatedPages = [...oldData.pages]
            if (updatedPages.length > 0) {
                updatedPages[0] = {
                    ...updatedPages[0],
                    data: [newItem, ...updatedPages[0].data],
                    total: updatedPages[0].total + 1
                }
            }
            
            return {
                ...oldData,
                pages: updatedPages
            }
        })
    }, [queryClient])

    // 특정 그래프 아이템 업데이트 (낙관적 업데이트)
    const updateGraphItem = useCallback((id: string, updates: Partial<GraphRow>) => {
        queryClient.setQueryData<{ pages: ApiResponse<GraphRow>[] }>(GRAPH_QUERY_KEY, (oldData) => {
            if (!oldData) return oldData
            
            return {
                ...oldData,
                pages: oldData.pages.map((page: ApiResponse<GraphRow>) => ({
                    ...page,
                    data: page.data.map((item: GraphRow) => 
                        item.id === id ? { ...item, ...updates } : item
                    )
                }))
            }
        })
    }, [queryClient])

    // 그래프 데이터 삭제 (카드는 유지하고 데이터만 삭제)
    const removeGraphData = useCallback((id: string) => {
        queryClient.setQueryData<{ pages: ApiResponse<GraphRow>[] }>(GRAPH_QUERY_KEY, (oldData) => {
            if (!oldData) return oldData
            
            return {
                ...oldData,
                pages: oldData.pages.map((page: ApiResponse<GraphRow>) => ({
                    ...page,
                    data: page.data.map((item: GraphRow) => 
                        item.id === id 
                            ? { 
                                ...item, 
                                metadata: null, // 그래프 데이터 삭제
                                // 카드는 그대로 유지하되 데이터만 삭제된 상태로 표시
                              }
                            : item
                    )
                }))
            }
        })
    }, [queryClient])

    // slug로 그래프 데이터 삭제 (카드는 유지하고 데이터만 삭제)
    const removeGraphDataBySlug = useCallback((slug: string) => {
        queryClient.setQueryData<{ pages: ApiResponse<GraphRow>[] }>(GRAPH_QUERY_KEY, (oldData) => {
            if (!oldData) return oldData
            
            return {
                ...oldData,
                pages: oldData.pages.map((page: ApiResponse<GraphRow>) => ({
                    ...page,
                    data: page.data.map((item: GraphRow) => 
                        item.slug === slug 
                            ? { 
                                ...item, 
                                metadata: null, // 그래프 데이터 삭제
                                // 카드는 그대로 유지하되 데이터만 삭제된 상태로 표시
                              }
                            : item
                    )
                }))
            }
        })
    }, [queryClient])

    // 그래프 카드 완전 삭제 (카드 자체를 삭제)
    const removeGraphItem = useCallback((id: string) => {
        queryClient.setQueryData<{ pages: ApiResponse<GraphRow>[] }>(GRAPH_QUERY_KEY, (oldData) => {
            if (!oldData) return oldData
            
            return {
                ...oldData,
                pages: oldData.pages.map((page: ApiResponse<GraphRow>) => ({
                    ...page,
                    data: page.data.filter((item: GraphRow) => item.id !== id),
                    total: Math.max(0, page.total - 1)
                }))
            }
        })
    }, [queryClient])

    return {
        // 데이터
        items: allItems,
        totalCount,
        hasMore,
        
        // 상태
        isLoading: isLoading || isFetchingNextPage,
        isError,
        error: error as Error | null,
        
        // 액션
        loadNextPage,
        invalidateAndRefresh,
        addGraphItem,
        updateGraphItem,
        removeGraphData, // 그래프 데이터만 삭제 (카드 유지)
        removeGraphDataBySlug, // slug로 그래프 데이터만 삭제 (카드 유지)
        removeGraphItem, // 그래프 카드 완전 삭제
        
        queryData: data,
        refetch
    }
}

