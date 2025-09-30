"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useWebSocketContext } from "@/components/websocket/WebSocketProvider"
import { GraphRow } from "@/features/graph/grid/grid.constants"

const GRAPH_QUERY_KEY = ['graphs'] as const

/**
 * 실시간 그래프 동기화를 위한 훅
 * WebSocket을 통해 다른 사용자의 그래프 변경사항을 실시간으로 반영
 */
export function useGraphRealtime() {
    const queryClient = useQueryClient()
    const { lastMessage } = useWebSocketContext()

    useEffect(() => {
        if (!lastMessage) return

        // 그래프 관련 WebSocket 메시지 처리
        if (lastMessage.type === 'graph-created') {
            const newGraph = lastMessage.data as GraphRow
            
            // 캐시에 새 그래프 추가
            queryClient.setQueryData<any>(GRAPH_QUERY_KEY, (oldData) => {
                if (!oldData) return oldData
                
                const updatedPages = [...oldData.pages]
                if (updatedPages.length > 0) {
                    // 중복 체크
                    const exists = updatedPages[0].data.some((item: GraphRow) => item.slug === newGraph.slug)
                    if (!exists) {
                        updatedPages[0] = {
                            ...updatedPages[0],
                            data: [newGraph, ...updatedPages[0].data],
                            total: updatedPages[0].total + 1
                        }
                    }
                }
                
                return {
                    ...oldData,
                    pages: updatedPages
                }
            })
        }
        
        else if (lastMessage.type === 'graph-deleted') {
            const deletedSlug = lastMessage.data.slug as string
            
            // 캐시에서 그래프 제거
            queryClient.setQueryData<any>(GRAPH_QUERY_KEY, (oldData) => {
                if (!oldData) return oldData
                
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        data: page.data.filter((item: GraphRow) => item.slug !== deletedSlug),
                        total: Math.max(0, page.total - 1)
                    }))
                }
            })
        }
        
        else if (lastMessage.type === 'graph-updated') {
            const updatedGraph = lastMessage.data as GraphRow
            
            // 캐시에서 그래프 업데이트
            queryClient.setQueryData<any>(GRAPH_QUERY_KEY, (oldData) => {
                if (!oldData) return oldData
                
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        data: page.data.map((item: GraphRow) => 
                            item.slug === updatedGraph.slug ? updatedGraph : item
                        )
                    }))
                }
            })
        }
        
    }, [lastMessage, queryClient])
}

/**
 * 그래프 변경사항을 WebSocket으로 브로드캐스트하는 함수들
 */
export function useGraphBroadcast() {
    const { sendMessage } = useWebSocketContext()

    const broadcastGraphCreated = (graph: GraphRow) => {
        sendMessage({
            type: 'graph-created',
            data: graph
        })
    }

    const broadcastGraphDeleted = (slug: string) => {
        sendMessage({
            type: 'graph-deleted',
            data: { slug }
        })
    }

    const broadcastGraphUpdated = (graph: GraphRow) => {
        sendMessage({
            type: 'graph-updated',
            data: graph
        })
    }

    return {
        broadcastGraphCreated,
        broadcastGraphDeleted,
        broadcastGraphUpdated
    }
}
