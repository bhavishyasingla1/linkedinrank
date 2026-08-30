import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import FooterLayout from '@/components/FooterLayout'
import { ArrowRightIcon, SparklesIcon, ToolIcon } from '@/components/ui/Icons'

export const metadata: Metadata = {
    title: 'Page Not Found | 404',
    description: 'The page you are looking for does not exist or has been moved.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fbfbfe] text-[#050315] flex flex-col selection:bg-[#dedcff] selection:text-[#2f27ce]">
            <SiteHeader />

            <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    {/* 404 Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dedcff] border border-[#dedcff] shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#2f27ce] animate-pulse" />
                        <span className="text-[12.5px] font-extrabold text-[#2f27ce] uppercase tracking-wider">
                            Error 404 • Page Not Found
                        </span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-[42px] sm:text-[60px] font-black text-[#050315] tracking-tight leading-none">
                            Lost in the Algorithm?
                        </h1>
                        <p className="text-[16px] sm:text-[18px] text-[#050315]/70 max-w-lg mx-auto leading-relaxed">
                            The page or resource you are looking for has moved, been updated, or does not exist.
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
                        <Link
                            href="/#upload"
                            className="p-5 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow hover:border-[#2f27ce] transition-all no-underline group space-y-1.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="w-8 h-8 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center">
                                    <SparklesIcon size={15} />
                                </span>
                                <ArrowRightIcon size={14} className="text-[#050315]/40 group-hover:text-[#2f27ce] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <h3 className="text-[15px] font-extrabold text-[#050315] group-hover:text-[#2f27ce] transition-colors">
                                Analyze Your Profile
                            </h3>
                            <p className="text-[12.5px] text-[#050315]/65 leading-relaxed">
                                Upload your LinkedIn PDF for a free 30+ signal diagnostic audit.
                            </p>
                        </Link>

                        <Link
                            href="/tools"
                            className="p-5 rounded-3xl bg-white border-2 border-[#dedcff] aside-card-shadow hover:border-[#2f27ce] transition-all no-underline group space-y-1.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="w-8 h-8 rounded-full bg-[#dedcff] text-[#2f27ce] flex items-center justify-center">
                                    <ToolIcon id="tools" size={15} />
                                </span>
                                <ArrowRightIcon size={14} className="text-[#050315]/40 group-hover:text-[#2f27ce] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <h3 className="text-[15px] font-extrabold text-[#050315] group-hover:text-[#2f27ce] transition-colors">
                                Free LinkedIn Tools
                            </h3>
                            <p className="text-[12.5px] text-[#050315]/65 leading-relaxed">
                                Access 12 AI generator tools for headlines, about sections, and hooks.
                            </p>
                        </Link>
                    </div>

                    {/* Primary Button Return */}
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#2f27ce] to-[#433bff] text-white text-[14px] font-bold shadow-md shadow-[#2f27ce]/20 hover:shadow-lg transition-all no-underline active:scale-95"
                        >
                            <span>Return to Homepage</span>
                            <ArrowRightIcon size={14} />
                        </Link>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}
