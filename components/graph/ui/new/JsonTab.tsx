interface JsonTabProps {
    slug: string
    jsonText: string
    onJsonTextChange: (text: string) => void
    exampleJson: string
    saving: boolean
    onSave: () => void
}

export default function JsonTab({
    slug,
    jsonText,
    onJsonTextChange,
    exampleJson,
    saving,
    onSave
}: JsonTabProps) {
    return (
        <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-300">
                오른쪽 예시를 참고해 JSON을 직접 붙여넣어 저장할 수 있습니다.
                저장 시 <code>def.slug</code>는 현재 주소의 <code>{slug}</code>로 강제 설정됩니다.
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="mb-1 text-sm font-semibold">입력</div>
                    <textarea 
                        className="w-full min-h-[460px] border rounded p-2 font-mono text-sm resize-y overflow-auto"
                        value={jsonText}
                        onChange={(e) => onJsonTextChange(e.target.value)}
                        spellCheck={false}
                    />
                </div>
                <div>
                    <div className="mb-1 text-sm font-semibold">예시</div>
                    <pre className="w-full min-h-[460px] border rounded p-2 font-mono text-xs bg-black/5 dark:bg-white/5 overflow-auto">
                        {exampleJson}
                    </pre>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {saving ? "저장 중..." : "저장"}
                </button>
            </div>
        </div>
    )
}
