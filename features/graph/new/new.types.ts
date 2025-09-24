import type { Variant, TagTone, Visibility } from "../../../features/graph/new/new.constants"
import type { ChartApiResponse, ChartType } from "@/features/graph/Chart/chart.constant"

export type GraphRow = {
    id: string
    slug: string
    title: string
    description?: string | null
    path?: string | null
    external_url?: string | null
    variant: Variant
    icon_key?: string | null
    tag?: string | null
    tag_tone: TagTone | null
    category?: string | null
    is_active: number
    is_external: number
    order_priority: number
    visibility: Visibility
    metadata?: Record<string, any> | null
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CardProps {
    slug: string
    title: string
    description?: string
    href: string
    icon?: React.ReactNode
    tag?: string
    tagTone?: TagTone
    variant?: Variant
    external?: boolean
    disabled?: boolean
    prefetch?: boolean
    cta?: string
    className?: string
}

// New Graph Data Page 관련 타입들
export type Row = Record<string, string | number>

export interface GraphInfo {
    title: string
    slug: string
}

export interface SaveOptions {
    slug: string
    graphInfo: GraphInfo | null
    notifyDataAdded: (title: string) => void
    router: {
        replace: (url: string) => void
        refresh: () => void
    }
}

export interface FormPayloadOptions {
    slug: string
    typeLabel: ChartType
    xKey: string
    yKey: string
    title: string
    rows: Row[]
}

