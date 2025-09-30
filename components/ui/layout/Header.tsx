"use client"

import "@/styles/components/layout/header.css"
import { HeaderNavbar } from "./header/Navbar"
import { Greeting } from "./header/Greeting"
import { HeaderLogo } from "./header/Logo"
import { useEffect, useRef, useState } from "react"
import { HeaderMoblieMenu } from "./header/MobileMenu"
import { HeaderMoblieMenuButton } from "./header/MoblieMenuButton"
import { HeaderLanguageSwitcherButton } from "./header/LanguageSwitcherButton"
import { useTranslation } from "@/lib/i18n/i18n-client"
import clsx from "clsx"
import UserQuickPanel from "../menu-panel/UserQuickPanel"
import useSessionQuery from "../../../hooks/auth/useSessionQuery"
import { useDemoStore } from "@/stores/ui/demo.store"
import WebSocketStatus from "@/components/websocket/WebSocketStatus"

export default function Header() {

    const { status, query } = useSessionQuery()
    const [open, setOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const { isDemoVisible, toggleDemo } = useDemoStore()
    const { t } = useTranslation()

    useEffect(() => {

        const onKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") setOpen(false)
        }
        document.addEventListener("keydown", onKeyDown)
        if(open) {
            const prev = document.body.style.overflow
            document.body.style.overflow = "hidden"
            
            return () => {
                document.body.style.overflow = prev
                document.removeEventListener("keydown", onKeyDown)
            }
        }

        return () => document.removeEventListener("keydown", onKeyDown)
    }, [open])

    const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(!panelRef.current) return
        if(!panelRef.current.contains(e.target as Node)) setOpen(false)
    }

    return (
        <header
            className={clsx(
                "relative text-white",
                "border-b border-white/10"
            )}
        >
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,_#12090D_10%,_#0B1C29_45%,_#00B3FF_120%)] opacity-90" />
                <div className="absolute -top-28 -right-28 h-[420px] w-[420px] rounded-full
                                bg-[radial-gradient(closest-side,_rgba(0,179,255,0.75),_rgba(0,179,255,0)_70%)]
                                blur-2xl" />
            </div>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 xl:px-12">
                <div className="flex items-center gap-5">
                    <HeaderLogo brandName={t("header.logo")} variant="default" />
                </div>
                <div className="ml-auto flex items-center gap-3 md:gap-6 min-w-0">
                    <div className="hidden sm:block">
                        <WebSocketStatus />
                    </div>
                    <button
                        onClick={toggleDemo}
                        className={clsx(
                            "px-2 py-1 text-xs font-medium rounded transition-colors",
                            isDemoVisible
                                ? "bg-cyan-400 text-black hover:bg-cyan-300"
                                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                          )}
                        title={isDemoVisible ? "데모 숨기기" : "데모 보기"}
                        aria-pressed={isDemoVisible}
                    >
                        <span
                            className={clsx(
                                "mr-2 inline-block h-1.5 w-1.5 rounded-full",
                                isDemoVisible ? "bg-violet-400" : "bg-white/50" )} />
                            DEMO
                    </button>
                    <HeaderLanguageSwitcherButton />
                    <div className="hidden md:block h-6 w-px bg-white/20 shrink-0" />

                    <Greeting status={status} user={query?.data?.user} />                        
                    <UserQuickPanel />
                    <HeaderMoblieMenuButton open={open} onOpen={() => setOpen(true)} />
                </div>
                <div 
                    className={clsx(
                        "fixed inset-0 z-[60] transition-[opacity,visibility] duration-200",
                        open ? "visible opacity-100" : "invisible opacity-0"
                    )}
                    aria-hidden={!open}
                    onMouseDown={handleOverlayClick}
                >
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-md">
                        <div ref={panelRef}>
                            <HeaderMoblieMenu open={open} onClose={() => setOpen(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}