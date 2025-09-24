interface TabSwitcherProps {
    activeTab: "form" | "json"
    onTabChange: (tab: "form" | "json") => void
}

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
    return (
        <div className="mb-4 flex- gap-2">
            <button
                className={`px-3 py-1.5 rounded border ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900"}`}
                onClick={() => onTabChange("form")}
            >
                폼으로 입력
            </button>
            <button
                className={`px-3 py-1.5 rounded border ${activeTab === "json" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-900"}`}
                onClick={() => onTabChange("json")}
            >
                JSON으로 입력
            </button>
        </div>
    )
}
