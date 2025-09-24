import type { ChartType } from "@/features/graph/Chart/chart.constant"

interface FormFieldsProps {
    title: string
    onTitleChange: (title: string) => void
    typeLabel: ChartType
    onTypeChange: (type: ChartType) => void
    xKey: string
    onXKeyChange: (xKey: string) => void
    yKey: string
    onYKeyChange: (yKey: string) => void
}

export default function FormFields({
    title,
    onTitleChange,
    typeLabel,
    onTypeChange,
    xKey,
    onXKeyChange,
    yKey,
    onYKeyChange
}: FormFieldsProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">제목(Title)</span>
                <input
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="그래프 제목"
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">타입(Type)</span>
                <select
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                    value={typeLabel}
                    onChange={(e) => onTypeChange(e.target.value as ChartType)}
                >
                    <option>Bar</option>
                    <option>Pie</option>
                    <option>Doughnut</option>
                    <option>Line</option>
                    <option>Histogram</option>
                </select>
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">X 키</span>
                <input 
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                    value={xKey}
                    onChange={(e) => onXKeyChange(e.target.value)}
                    placeholder="label"
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Y 키</span>
                <input 
                    className="border rounded px-3 py-2 bg-white dark:bg-slate-900"
                    value={yKey}
                    onChange={(e) => onYKeyChange(e.target.value)}
                    placeholder="label"
                />
            </label>
        </section>
    )
}
