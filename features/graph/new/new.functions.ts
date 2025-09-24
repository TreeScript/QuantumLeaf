import axiosClient from "@/lib/axios/axiosClient"
import { normalizeType } from "@/features/graph/Chart/chart.utils"
import type { ChartApiResponse, ChartType } from "@/features/graph/Chart/chart.constant"
import type { Row, GraphInfo, SaveOptions, FormPayloadOptions } from "./new.types"

// 데이터 조작 함수들
export const updateCell = (
    rows: Row[], 
    rowIndex: number, 
    key: string, 
    value: string
): Row[] => {
    return rows.map((row, idx) => (
        idx === rowIndex 
            ? { ...row, [key]: isFinite(+value) ? Number(value) : value } 
            : row
    ))
}

export const addRow = (rows: Row[], xKey: string, yKey: string): Row[] => {
    return [...rows, { [xKey]: "", [yKey]: 0 }]
}

export const removeRow = (rows: Row[], rowIndex: number): Row[] => {
    return rows.filter((_, idx) => idx !== rowIndex)
}

// 페이로드 생성 함수들
export const createFormPayload = (options: FormPayloadOptions): ChartApiResponse => {
    const { slug, typeLabel, xKey, yKey, title, rows } = options
    
    return {
        def: {
            id: "tmp-preview",
            slug,
            type: normalizeType(typeLabel),
            fieldMap: { x: xKey, y: yKey },
            options: { title },
            dataSource: { kind: "inline" },
        },
        data: rows,
    }
}

export const createExampleJson = (): string => {
    return JSON.stringify({
        def: {
            idf: "tmp or any",
            slug: "will-be-overriden-by-url",
            type: "Bar",
            fieldMap: { x: "label", y: "value" },
            option: { title: "title" },
            dataSource: { kind: "inline" },
        },
        data: [{ label: "A", value: 10 }],
    }, null, 2)
}

// 유틸리티 함수들
export const generateId = (): string => {
    return (crypto as any)?.randomUUID?.() ?? "id_" + Date.now()
}

export const normalizeJsonPayload = (
    jsonText: string, 
    slug: string
): ChartApiResponse => {
    let payload = JSON.parse(jsonText) as ChartApiResponse

    const raw = (payload.def?.type ?? "Bar") as any as ChartType
    payload.def.type = normalizeType(
        (typeof raw === "string" ? (raw.charAt(0).toUpperCase() + raw.slice(1)) : "Bar") as ChartType
    )
    payload.def.slug = slug
    
    if (!payload.def.id || payload.def.id === "tmp-priview") {
        payload.def.id = generateId()
    }

    return payload
}

// API 호출 함수들
export const fetchGraphInfo = async (slug: string): Promise<GraphInfo> => {
    try {
        const response = await axiosClient.get(`/api/graph/${slug}/info`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch graph info:", error)
        return { title: slug, slug }
    }
}

export const saveGraphData = async (
    payload: ChartApiResponse, 
    slug: string
): Promise<void> => {
    await axiosClient.post(`/api/graph/${slug}`, payload)
}

// 저장 관련 함수들
export const saveFromForm = async (
    formPayload: ChartApiResponse,
    saveOptions: SaveOptions,
    setSaving: (saving: boolean) => void
): Promise<void> => {
    const { slug, graphInfo, notifyDataAdded, router } = saveOptions
    
    try {
        setSaving(true)
        
        const payload: ChartApiResponse = {
            ...formPayload,
            def: { ...formPayload.def, slug },
        }
        
        if (!payload.def.id || payload.def.id === "tmp-priview") {
            payload.def.id = generateId()
        }

        await saveGraphData(payload, slug)
        
        // 성공 시 알림 트리거 (실제 그래프 제목 사용)
        const graphTitle = graphInfo?.title || slug
        notifyDataAdded(graphTitle)
        
        router.replace(`/main/graph/${slug}`)
        router.refresh()
    } catch (err: any) {
        alert(`저장 실패: ${err?.message} - Unknown Error`)
    } finally {
        setSaving(false)
    }
}

export const saveFromJson = async (
    jsonText: string,
    saveOptions: SaveOptions,
    setSaving: (saving: boolean) => void
): Promise<void> => {
    const { slug, graphInfo, notifyDataAdded, router } = saveOptions
    
    try {
        setSaving(true)
        
        const payload = normalizeJsonPayload(jsonText, slug)
        await saveGraphData(payload, slug)
        
        // 성공 시 알림 트리거 (실제 그래프 제목 사용)
        const graphTitle = graphInfo?.title || slug
        notifyDataAdded(graphTitle)
        
        router.replace(`/main/graph/${slug}`)
        router.refresh()
    } catch (err: any) {
        alert("JSON이 유효한지 확인해주세요.\n" + (err?.message ?? "unknown error"))
    } finally {
        setSaving(false)
    }
}
