"use client"

import "@/styles/components/layout/footer.css"
import { FaGithub, FaInstagram } from "react-icons/fa"
import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "@/lib/i18n/i18n-client"
import LocaleLink from "../common/i18n/LocaleLink"

export default function Footer() {

    const { t } = useTranslation()

    const nav = [
        { href: "/main", label: t("footer.footer_nav.home") },
        { href: "/introduce", label: t("footer.footer_nav.introduce") },
        { href: "/docs", label: t("footer.footer_nav.document") },
        { href: "/contact", label: t("footer.footer_nav.contact") },
        { href: "/developer", label: t("footer.footer_nav.developer") },
    ]

    return (
        <footer className={["relative text-white", "border-t border-white/10"].join(" ")}>
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A0F1A_0%,#0B1C29_60%,#0B5E7E_130%)] opacity-90" />
                <div className="absolute -bottom-16 -right-14 h-[260px] w-[260px] rounded-full
                                bg-[radial-gradient(closest-side,rgba(14,116,144,0.6),rgba(14,116,144,0)_70%)]
                                blur-xl opacity-40" />
            </div>

            <div className="mx-auto max-w-7xl px-4 md:px-6 xl:px-12">
                <div className="grid md:grid-cols-3 items-center gap-4 py-2">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="inline-flex items-baseline gap-1 text-lg font-semibold tracking-tight md:text-xl">
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#8EE7FF_0%,#00B3FF_100%)] drop-shadow-[0_0_8px_rgba(0,179,255,0.18)]">
                                {t("footer.logo")}
                            </span>
                            <span className="translate-y-[1px] text-cyan-300/80 text-base md:text-lg">_</span>
                        </h2>
                        <p className="text-[11px] text-white/60">{t("footer.title")}</p>
                    </div>


                    <nav className="flex justify-center">
                        <ul className="flex flex-wrap items-center gap-4">
                            {nav.map((item) => (
                                <li key={item.href}>
                                    <LocaleLink
                                        href={item.href}
                                        className={[
                                            "relative inline-flex items-center font-medium tracking-tight",
                                            "text-[13px] text-white/75 hover:text-white transition-colors",
                                            'after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0',
                                            'after:bg-[linear-gradient(90deg,#8EE7FF_0%,#00B3FF_100%)] after:opacity-90',
                                            "hover:after:w-full after:transition-[width] after:duration-250"
                                        ].join(" ")}
                                    >{item.label}</LocaleLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex justify-center gap-2.5 md:justify-end">
                        <a
                            href="https://github.com/TreeScript"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Github"
                            title="GitHub"
                            className={[
                                "group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg",
                                "border border-white/10 bg-white/[0.06] hover:bg-white/[0.08] transition-colors"
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%]",
                                    "transition-transform duration-600 ease-out",
                                    "before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:skew-x-12",
                                    "before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05),transparent)]"
                                ].join(" ")}
                            />
                            <FaGithub className="text-white/80" size={16} />
                        </a>

                        <a
                            href="http://instagram.com/kihunism_"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            title="Instagram"
                            className={[
                                "group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg",
                                "border border-white/10 bg-white/[0.06] hover:bg-white/[0.08] transition-colors"
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%]",
                                    "transition-transform duration-600 ease-out",
                                    "before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:skew-x-12",
                                    "before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05),transparent)]"
                                ].join(" ")}
                            />
                            <FaInstagram className="text-pink-400/80" size={16} />
                        </a>

                        <a
                            href="https://blog.naver.com/kihoonworks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Naver Blog"
                            title="Naver Blog"
                            className={[
                                "group relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg",
                                "border border-white/10 bg-white/[0.06] hover:bg-white/[0.08] transition-colors"
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%]",
                                    "transition-transform duration-600 ease-out",
                                    "before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:skew-x-12",
                                    "before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05),transparent)]"
                                ].join(" ")}
                            />
                            <GlobeAltIcon className="h-4 w-4 text-green-400/80" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/10 py-2 text-center text-[11px] text-white/55">
                    {`${t("footer.copyrighter")}`}
                </div>
            </div>
        </footer>
    )
}