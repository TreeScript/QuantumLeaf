import GraphGrid from "../graph/ui/GraphGrid"
import GraphRefreshButton from "../graph/ui/GraphRefreshButton"

export const dynamic = "force-dynamic"

export default async function Mainpage() {
    return (
        <div className="pt-4 sm:pt-6">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            그래프 목록
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            🔄 자동 업데이트 활성화 (2분마다) • 실시간 동기화 지원
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">수동 새로고침</span>
                        <GraphRefreshButton variant="icon-only" />
                    </div>
                </div>
            </div>
            <GraphGrid />
        </div>
    )
}