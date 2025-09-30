"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import type { ChartApiResponse, ChartType } from "@/features/graph/Chart/chart.constant"
import { useGraphActivityNotification } from "@/features/notification/bar/bar.features"
import { useGraphCache } from "@/hooks/graph/useGraphCache"
import TabSwitcher from "@/components/graph/ui/new/TabSwitcher"
import FormTab from "@/components/graph/ui/new/FormTab"
import JsonTab from "@/components/graph/ui/new/JsonTab"
import type { Row, GraphInfo } from "@/features/graph/new/new.types"
import {
    updateCell as updateCellUtil,
    addRow as addRowUtil,
    removeRow as removeRowUtil,
    createFormPayload,
    createExampleJson,
    fetchGraphInfo,
    saveFromForm as saveFromFormUtil,
    saveFromJson as saveFromJsonUtil
} from "@/features/graph/new/new.functions"


export default function NewGraphDataPage() {

    const router = useRouter()
    const { locale, slug } = useParams() as { 
        locale: string 
        slug: string
    }
    const { notifyDataAdded } = useGraphActivityNotification()
    const { invalidateCache } = useGraphCache()
    const [tab, setTab] = useState<"form" | "json">("form")
    const [title, setTitle] = useState(`샘플 그래프`)
    const [graphInfo, setGraphInfo] = useState<GraphInfo | null>(null)
    const [typeLabel, setTypeLabel] = useState<ChartType>("Bar")
    const [xKey, setXKey] = useState("label")
    const [yKey, setYKey] = useState("value")
    const [rows, setRows] = useState<Row[]>([
        { label: "A", value: 10 },
        { label: "B", value: 20 },
    ])

    const updateCell = (ri: number, key: string, value: string) => {
        setRows((prev) => updateCellUtil(prev, ri, key, value))
    }
    const addRow = () => setRows((prev) => addRowUtil(prev, xKey, yKey))
    const removeRow = (ri: number) => setRows((prev) => removeRowUtil(prev, ri))

    const formPayload: ChartApiResponse = useMemo(
        () => createFormPayload({ slug, typeLabel, xKey, yKey, title, rows }),
        [slug, typeLabel, xKey, yKey, title, rows]
    )

    const exampleJson = useMemo(() => createExampleJson(), [])
    const [jsonText, setJsonText] = useState<string>(exampleJson)
    const [saving, setSaving] = useState(false)

    // 그래프 정보 가져오기
    useEffect(() => {
        const loadGraphInfo = async () => {
            const info = await fetchGraphInfo(slug)
            setGraphInfo(info)
        }
        
        loadGraphInfo()
    }, [slug])

    const saveFromForm = async () => {
        const saveOptions = {
            slug,
            graphInfo,
            notifyDataAdded,
            router
        }
        await saveFromFormUtil(formPayload, saveOptions, setSaving)
        // 저장 후 캐시 무효화
        await invalidateCache()
    }

    const saveFromJson = async () => {
        const saveOptions = {
            slug,
            graphInfo,
            notifyDataAdded,
            router
        }
        await saveFromJsonUtil(jsonText, saveOptions, setSaving)
        // 저장 후 캐시 무효화
        await invalidateCache()
    }


    return (
        <div className="mx-auto max-w-3xl px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">
                {graphInfo ? `${graphInfo.title} - 데이터 추가` : "데이터 추가"}
            </h1>
            
            <TabSwitcher activeTab={tab} onTabChange={setTab} />

            {tab === "form" ? (
                <FormTab
                    title={title}
                    onTitleChange={setTitle}
                    typeLabel={typeLabel}
                    onTypeChange={setTypeLabel}
                    xKey={xKey}
                    onXKeyChange={setXKey}
                    yKey={yKey}
                    onYKeyChange={setYKey}
                    rows={rows}
                    onUpdateCell={updateCell}
                    onAddRow={addRow}
                    onRemoveRow={removeRow}
                    formPayload={formPayload}
                    saving={saving}
                    onSave={saveFromForm}
                />
            ) : (
                <JsonTab
                    slug={slug}
                    jsonText={jsonText}
                    onJsonTextChange={setJsonText}
                    exampleJson={exampleJson}
                    saving={saving}
                    onSave={saveFromJson}
                />
            )} 
        </div>
    )
}