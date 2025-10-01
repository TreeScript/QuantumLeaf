"use client"

import axiosClient from "@/lib/axios/axiosClient"
import { useRouter } from "next/navigation"
import { useGraphData } from "@/hooks/graph/useGraphData"
import { useGraphBroadcast } from "@/hooks/graph/useGraphRealtime"
import { useNotificationStore } from "@/stores/notification/notification.store"

export default function DeleteGraphButton({ slug }: { slug: string }) {
    const router = useRouter()
    const { removeGraphDataBySlug } = useGraphData()
    const { broadcastGraphDeleted } = useGraphBroadcast()
    const { addNotification } = useNotificationStore()

    const onDelete = async () => {
        if (!confirm(`그래프 데이터를 삭제할까요? 카드는 유지됩니다.`)) return

        try {
            // 1. 먼저 UI에서 즉시 데이터 삭제 (낙관적 업데이트)
            removeGraphDataBySlug(slug)
            
            // 2. 서버에 삭제 요청
            const response = await axiosClient.delete(`/api/graph/${slug}`)
            
            // 3. 다른 사용자들에게 실시간 브로드캐스트
            broadcastGraphDeleted(slug)
            
            // 4. 성공 알림
            addNotification("그래프 데이터가 성공적으로 삭제되었습니다.", "success")
            
            // 5. 메인 페이지로 이동
            router.replace('/main')
            
        } catch (error) {
            console.error("Failed to delete graph:", error)
            addNotification("그래프 삭제에 실패했습니다.", "error")
        }
    }

    return (
        <button
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onDelete}
        >삭제</button>
    )
}