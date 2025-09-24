import type { ChartApiResponse, ChartType } from "@/features/graph/Chart/chart.constant"
import FormFields from "./FormFields"
import DataTable from "./DataTable"

type Row = Record<string, string | number>

interface FormTabProps {
    title: string
    onTitleChange: (title: string) => void
    typeLabel: ChartType
    onTypeChange: (type: ChartType) => void
    xKey: string
    onXKeyChange: (xKey: string) => void
    yKey: string
    onYKeyChange: (yKey: string) => void
    rows: Row[]
    onUpdateCell: (rowIndex: number, key: string, value: string) => void
    onAddRow: () => void
    onRemoveRow: (rowIndex: number) => void
    formPayload: ChartApiResponse
    saving: boolean
    onSave: () => void
}

export default function FormTab({
    title,
    onTitleChange,
    typeLabel,
    onTypeChange,
    xKey,
    onXKeyChange,
    yKey,
    onYKeyChange,
    rows,
    onUpdateCell,
    onAddRow,
    onRemoveRow,
    formPayload,
    saving,
    onSave
}: FormTabProps) {
    return (
        <div className="space-y-6">
            <FormFields
                title={title}
                onTitleChange={onTitleChange}
                typeLabel={typeLabel}
                onTypeChange={onTypeChange}
                xKey={xKey}
                onXKeyChange={onXKeyChange}
                yKey={yKey}
                onYKeyChange={onYKeyChange}
            />
            
            <DataTable
                rows={rows}
                xKey={xKey}
                yKey={yKey}
                onUpdateCell={onUpdateCell}
                onAddRow={onAddRow}
                onRemoveRow={onRemoveRow}
            />
            
            <div className="flex items-center gap-2">
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {saving ? "저장 중..." : "저장"}
                </button>
            </div>

            <details className="mt-4">
                <summary className="cursor-point text-sm text-gray-600 dark:text-gray-300">
                    JSON 미리보기
                </summary>
                <pre
                    suppressHydrationWarning 
                    className="mt-2 whitespace-pre-wrap rounded border p-3 bg-black/5 dark:bg-white/5 text-xs"
                >
                    {JSON.stringify(formPayload, null, 2)}
                </pre>
            </details>
        </div>
    )
}
