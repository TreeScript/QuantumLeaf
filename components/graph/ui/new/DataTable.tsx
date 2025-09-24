type Row = Record<string, string | number>

interface DataTableProps {
    rows: Row[]
    xKey: string
    yKey: string
    onUpdateCell: (rowIndex: number, key: string, value: string) => void
    onAddRow: () => void
    onRemoveRow: (rowIndex: number) => void
}

export default function DataTable({
    rows,
    xKey,
    yKey,
    onUpdateCell,
    onAddRow,
    onRemoveRow
}: DataTableProps) {
    return (
        <section>
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    데이터(임시 수동 입력) - 엑셀 업로드는 추후 'file/remote' dataSource로 기능 확장 예정
                </div>
                <button
                    onClick={onAddRow}
                    className="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700"
                >
                    행 추가
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-black/5 dark:bg-white/10">
                        <tr>
                            <th className="border px-2 py-1 text-left">{xKey}</th>
                            <th className="border px-2 py-1 text-left">{yKey}</th>
                            <th className="border px-2 py-1 w-24">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td className="border p-1">
                                    <input 
                                        className="w-full rounded border px-2 py-1 bg-white dark:bg-slate-900"
                                        value={(row[xKey] as any) ?? ""}
                                        onChange={(e) => onUpdateCell(idx, xKey, e.target.value)}
                                    />
                                </td>               
                                <td className="border p-1">
                                    <input 
                                        className="w-full rouned border px-2 py-1 bg-white dark:bg-slate-900"
                                        value={(row[yKey] as any) ?? ""}
                                        onChange={(e) => onUpdateCell(idx, yKey, e.target.value)}
                                    />
                                </td>                     
                                <td className="border p-1 text-center">
                                    <button
                                        onClick={() => onRemoveRow(idx)}
                                        className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                    >
                                        삭제
                                    </button>
                                </td>                                            
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr>
                                <td className="border p-2 text-center text-gray-500" colSpan={3}>
                                    행이 없습니다. "행 추가를 눌러주세요."
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
