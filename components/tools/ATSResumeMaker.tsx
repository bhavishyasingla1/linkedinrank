'use client'

import React, { useState } from 'react'
import {
    ATSResumeData,
    extractATSResumeFromProfile,
    exportToPlainText,
    exportToWordHtml,
} from '@/lib/tools'
import {
    UploadIcon,
    CopyIcon,
    AlertCircleIcon,
    FileTextIcon,
    ShieldCheckIcon,
    CheckIcon,
    XIcon,
} from '@/components/ui/Icons'

function DownloadIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    )
}

function PrinterIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
        </svg>
    )
}

function PlusIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    )
}

type TypographyTheme = 'calibri' | 'times' | 'georgia' | 'arial'

const INITIAL_RESUME: ATSResumeData = {
    contact: {
        fullName: '',
        headline: '',
        email: '',
        phone: '',
        location: '',
        linkedinUrl: '',
    },
    summary: '',
    experience: [
        {
            id: 'exp-1',
            title: '',
            company: '',
            startDate: '',
            endDate: 'Present',
            location: '',
            bullets: [''],
        },
    ],
    skills: {
        technical: [],
        frameworksAndTools: [],
        coreCompetencies: [],
    },
    education: [
        {
            id: 'edu-1',
            degree: '',
            school: '',
            graduationYear: '',
        },
    ],
    certifications: [],
}

export default function ATSResumeMaker() {
    // Resume Data State
    const [resume, setResume] = useState<ATSResumeData>(INITIAL_RESUME)
    const [skillsText, setSkillsText] = useState('')
    const [toolsText, setToolsText] = useState('')
    const [certsText, setCertsText] = useState('')

    // Upload & UI States
    const [isDragging, setIsDragging] = useState(false)
    const [pdfUploading, setPdfUploading] = useState(false)
    const [pdfFileName, setPdfFileName] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [theme, setTheme] = useState<TypographyTheme>('calibri')
    const [downloadStatus, setDownloadStatus] = useState<string | null>(null)
    const [showPreview, setShowPreview] = useState(false)

    // PDF Upload & Auto-fill Handler
    const handleFileProcess = async (file: File) => {
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            setUploadError('Please upload a PDF exported from LinkedIn.')
            return
        }

        setPdfUploading(true)
        setUploadError('')
        setPdfFileName(file.name)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/analyze', { method: 'POST', body: formData })
            const data = await res.json()
            const profile = data?.data?.profile || data?.profile

            if (!profile) {
                throw new Error('Unable to extract profile data from this PDF.')
            }

            const extracted = extractATSResumeFromProfile(profile)
            setResume(extracted)
            setSkillsText(extracted.skills.technical.join(', '))
            setToolsText(extracted.skills.frameworksAndTools.join(', '))
            setCertsText(extracted.certifications.join('\n'))
            setShowPreview(true)
        } catch (err: any) {
            console.error('PDF extraction error:', err)
            setUploadError(err.message || 'Failed to extract LinkedIn PDF. Please try again.')
        } finally {
            setPdfUploading(false)
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFileProcess(file)
        if (e.target) e.target.value = ''
    }

    // Update Skills on text change
    const handleSkillsChange = (text: string) => {
        setSkillsText(text)
        const list = text.split(',').map(s => s.trim()).filter(Boolean)
        setResume(prev => ({
            ...prev,
            skills: { ...prev.skills, technical: list }
        }))
    }

    const handleToolsChange = (text: string) => {
        setToolsText(text)
        const list = text.split(',').map(s => s.trim()).filter(Boolean)
        setResume(prev => ({
            ...prev,
            skills: { ...prev.skills, frameworksAndTools: list }
        }))
    }

    const handleCertsChange = (text: string) => {
        setCertsText(text)
        const list = text.split('\n').map(s => s.trim()).filter(Boolean)
        setResume(prev => ({ ...prev, certifications: list }))
    }

    // Add / Remove Position
    const addPosition = () => {
        setResume(prev => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: `exp-${Date.now()}`,
                    title: '',
                    company: '',
                    startDate: '',
                    endDate: 'Present',
                    location: '',
                    bullets: [''],
                }
            ]
        }))
    }

    const removePosition = (id: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter(e => e.id !== id)
        }))
    }

    // Add / Remove / Edit Bullets
    const addBullet = (expId: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id !== expId) return exp
                return { ...exp, bullets: [...exp.bullets, ''] }
            })
        }))
    }

    const updateBullet = (expId: string, idx: number, val: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id !== expId) return exp
                const newBullets = [...exp.bullets]
                newBullets[idx] = val
                return { ...exp, bullets: newBullets }
            })
        }))
    }

    const removeBullet = (expId: string, idx: number) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id !== expId) return exp
                return { ...exp, bullets: exp.bullets.filter((_, i) => i !== idx) }
            })
        }))
    }

    // Add / Remove Education
    const addEducation = () => {
        setResume(prev => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: `edu-${Date.now()}`,
                    degree: '',
                    school: '',
                    graduationYear: '',
                }
            ]
        }))
    }

    const removeEducation = (id: string) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.filter(e => e.id !== id)
        }))
    }

    // Helpers for safe filenames
    const getCandidateFilename = (ext: string) => {
        const rawName = resume.contact.fullName.trim() || 'Professional'
        const safeName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_')
        return `${safeName}_Resume.${ext}`
    }

    // 1. Print / Save Vector PDF
    const handlePrint = () => {
        setDownloadStatus('print')
        setTimeout(() => {
            window.print()
            setDownloadStatus(null)
        }, 200)
    }

    // 2. Download Word Document (.doc)
    const handleDownloadDoc = () => {
        try {
            const html = exportToWordHtml(resume)
            const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = getCandidateFilename('doc')
            document.body.appendChild(a)
            a.click()
            setDownloadStatus('doc')
            setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a)
                URL.revokeObjectURL(url)
                setDownloadStatus(null)
            }, 2500)
        } catch (err) {
            console.error('Word export error:', err)
        }
    }

    // 3. Download Plain Text (.txt)
    const handleDownloadTxt = () => {
        try {
            const text = exportToPlainText(resume)
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = getCandidateFilename('txt')
            document.body.appendChild(a)
            a.click()
            setDownloadStatus('txt')
            setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a)
                URL.revokeObjectURL(url)
                setDownloadStatus(null)
            }, 2500)
        } catch (err) {
            console.error('Text export error:', err)
        }
    }

    // 4. Copy All Plain Text
    const handleCopyText = async () => {
        try {
            const text = exportToPlainText(resume)
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text)
            } else {
                const ta = document.createElement('textarea')
                ta.value = text
                ta.style.position = 'fixed'
                ta.style.opacity = '0'
                document.body.appendChild(ta)
                ta.select()
                document.execCommand('copy')
                document.body.removeChild(ta)
            }
            setDownloadStatus('copy')
            setTimeout(() => setDownloadStatus(null), 3000)
        } catch (err) {
            console.error('Copy error:', err)
        }
    }

    const fontClass = {
        calibri: 'font-sans',
        times: 'font-serif',
        georgia: 'font-serif',
        arial: 'font-sans tracking-tight'
    }[theme]

    return (
        <div className="space-y-8 w-full">
            {/* ── 1. UPLOAD BOX (HOMEPAGE AESTHETIC) ───────────────────── */}
            <div className="rounded-3xl bg-white border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5 overflow-hidden transition-all duration-300">
                {/* Header Window Strip */}
                <div className="px-5 py-3.5 bg-[#dedcff]/50 border-b border-[#dedcff] flex items-center justify-between gap-4">
                    {/* macOS Window Dots */}
                    <div className="flex items-center gap-2" aria-hidden="true">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
                    </div>

                    {/* Center Document URL Pill */}
                    <div className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#dedcff] text-xs font-semibold text-[#050315] shadow-2xs leading-none">
                        <FileTextIcon size={14} className="text-[#2f27ce]" />
                        <span>linkedin-to-resume.pdf</span>
                    </div>

                    {/* Right Security Pill */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[#2f27ce] bg-white border border-[#dedcff] px-3.5 py-1.5 rounded-full shadow-2xs leading-none">
                            <ShieldCheckIcon size={13} />
                            <span>100% Free</span>
                        </span>
                    </div>
                </div>

                {/* Dropzone Area */}
                <div className="p-6 sm:p-8">
                    <input
                        id="ats-pdf-file-input"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileInput}
                        className="sr-only"
                        disabled={pdfUploading}
                    />

                    <label
                        htmlFor="ats-pdf-file-input"
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault()
                            setIsDragging(false)
                            if (e.dataTransfer.files?.[0]) handleFileProcess(e.dataTransfer.files[0])
                        }}
                        className={`
                            relative flex flex-col items-center justify-center cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center
                            transition-all duration-200 select-none block group/drop
                            ${isDragging
                                ? 'border-[#433bff] bg-[#dedcff]/50 scale-[0.99] ring-4 ring-[#433bff]/20'
                                : 'border-[#dedcff] bg-[#fbfbfe] hover:border-[#2f27ce] hover:bg-[#dedcff]/20'
                            }
                            ${pdfUploading ? 'pointer-events-none opacity-80' : ''}
                        `}
                    >
                        <div className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-200
                            ${isDragging
                                ? 'bg-[#2f27ce] text-white scale-110 shadow-lg shadow-[#2f27ce]/30'
                                : 'bg-[#dedcff] text-[#2f27ce] group-hover/drop:bg-[#2f27ce] group-hover/drop:text-white shadow-xs'
                            }
                        `}>
                            {pdfUploading ? (
                                <svg className="animate-spin w-5 h-5 text-[#2f27ce]" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : (
                                <UploadIcon size={20} />
                            )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#050315] mb-1 tracking-tight">
                            {pdfUploading ? 'Extracting LinkedIn Profile...' : pdfFileName ? 'LinkedIn PDF Loaded' : 'Auto-fill from LinkedIn PDF (Optional)'}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#050315]/70 mb-1">
                            {pdfFileName ? `${pdfFileName} • You can edit any details below` : 'Drop your LinkedIn export PDF here to auto-fill, or enter details below'}
                        </p>
                    </label>
                </div>
            </div>

            {uploadError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircleIcon size={16} className="shrink-0" />
                    <span>{uploadError}</span>
                </div>
            )}

            {/* ── 2. ON-PAGE EDITABLE RESUME FORM ──────────────────────── */}
            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#dedcff] shadow-xl shadow-[#2f27ce]/5">
                <div className="border-b border-[#dedcff] pb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#050315] tracking-tight">
                            Resume Information
                        </h3>
                        <p className="text-xs text-[#050315]/70 mt-0.5">
                            Edit your city, job titles, achievements, and skills directly on the page.
                        </p>
                    </div>
                </div>

                {/* Contact Info (Explicit City / Location Field) */}
                <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2f27ce]">
                        1. Personal & Contact Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                            <label className="label-base">Full Name</label>
                            <input
                                type="text"
                                value={resume.contact.fullName}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, fullName: e.target.value } }))}
                                placeholder="e.g. Bhavishya Singla"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">Job Title / Headline</label>
                            <input
                                type="text"
                                value={resume.contact.headline}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, headline: e.target.value } }))}
                                placeholder="e.g. Senior Software Engineer"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">City, State / Country</label>
                            <input
                                type="text"
                                value={resume.contact.location}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, location: e.target.value } }))}
                                placeholder="e.g. San Francisco, CA"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">Email Address</label>
                            <input
                                type="email"
                                value={resume.contact.email}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, email: e.target.value } }))}
                                placeholder="e.g. alex@example.com"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">Phone Number</label>
                            <input
                                type="text"
                                value={resume.contact.phone}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, phone: e.target.value } }))}
                                placeholder="e.g. +1 (555) 019-2834"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">LinkedIn Profile URL</label>
                            <input
                                type="text"
                                value={resume.contact.linkedinUrl}
                                onChange={e => setResume(r => ({ ...r, contact: { ...r.contact, linkedinUrl: e.target.value } }))}
                                placeholder="e.g. linkedin.com/in/bhavishya"
                                className="input-base text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 pt-2 border-t border-[#dedcff]/70">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2f27ce]">
                        2. Professional Summary
                    </h4>
                    <textarea
                        rows={3}
                        value={resume.summary}
                        onChange={e => setResume(r => ({ ...r, summary: e.target.value }))}
                        placeholder="Write a brief professional summary of your expertise and background..."
                        className="input-base text-xs leading-relaxed"
                    />
                </div>

                {/* Work Experience */}
                <div className="space-y-4 pt-2 border-t border-[#dedcff]/70">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2f27ce]">
                            3. Work Experience
                        </h4>
                        <button
                            type="button"
                            onClick={addPosition}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#dedcff] text-[#2f27ce] text-xs font-bold hover:bg-[#2f27ce] hover:text-white transition-all shadow-2xs cursor-pointer"
                        >
                            <PlusIcon size={13} />
                            <span>Add Position</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {resume.experience.map((exp, expIdx) => (
                            <div key={exp.id} className="p-4 sm:p-5 rounded-2xl bg-[#fbfbfe] border border-[#dedcff] space-y-3 shadow-2xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#050315] bg-[#dedcff]/60 px-2 py-0.5 rounded-md">
                                        Position #{expIdx + 1}
                                    </span>
                                    {resume.experience.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePosition(exp.id)}
                                            className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                                        >
                                            ✕ Remove Position
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                                    <div>
                                        <label className="label-base">Job Title</label>
                                        <input
                                            type="text"
                                            value={exp.title}
                                            onChange={e => {
                                                const val = e.target.value
                                                setResume(r => ({
                                                    ...r,
                                                    experience: r.experience.map(item => item.id === exp.id ? { ...item, title: val } : item)
                                                }))
                                            }}
                                            placeholder="e.g. Senior Frontend Engineer"
                                            className="input-base text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="label-base">Company Name</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={e => {
                                                const val = e.target.value
                                                setResume(r => ({
                                                    ...r,
                                                    experience: r.experience.map(item => item.id === exp.id ? { ...item, company: val } : item)
                                                }))
                                            }}
                                            placeholder="e.g. Acme Corp"
                                            className="input-base text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="label-base">Dates (Start – End)</label>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="text"
                                                value={exp.startDate}
                                                onChange={e => {
                                                    const val = e.target.value
                                                    setResume(r => ({
                                                        ...r,
                                                        experience: r.experience.map(item => item.id === exp.id ? { ...item, startDate: val } : item)
                                                    }))
                                                }}
                                                placeholder="MM/YYYY"
                                                className="input-base text-xs"
                                            />
                                            <span className="text-xs text-[#050315]/40">–</span>
                                            <input
                                                type="text"
                                                value={exp.endDate}
                                                onChange={e => {
                                                    const val = e.target.value
                                                    setResume(r => ({
                                                        ...r,
                                                        experience: r.experience.map(item => item.id === exp.id ? { ...item, endDate: val } : item)
                                                    }))
                                                }}
                                                placeholder="Present"
                                                className="input-base text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-base">City / Location</label>
                                        <input
                                            type="text"
                                            value={exp.location || ''}
                                            onChange={e => {
                                                const val = e.target.value
                                                setResume(r => ({
                                                    ...r,
                                                    experience: r.experience.map(item => item.id === exp.id ? { ...item, location: val } : item)
                                                }))
                                            }}
                                            placeholder="City, State"
                                            className="input-base text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Bullet points */}
                                <div className="space-y-2 pt-1">
                                    <div className="flex items-center justify-between text-xs font-bold text-[#050315]/80">
                                        <span>Key Responsibilities & Accomplishments</span>
                                        <button
                                            type="button"
                                            onClick={() => addBullet(exp.id)}
                                            className="text-[#2f27ce] hover:underline flex items-center gap-0.5 cursor-pointer"
                                        >
                                            <PlusIcon size={11} />
                                            <span>Add Bullet</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {exp.bullets.map((b, bIdx) => (
                                            <div key={bIdx} className="flex items-center gap-1.5">
                                                <span className="text-[#2f27ce] font-bold text-xs">•</span>
                                                <input
                                                    type="text"
                                                    value={b}
                                                    onChange={e => updateBullet(exp.id, bIdx, e.target.value)}
                                                    placeholder="e.g. Developed core platform features, improving system performance by 25%."
                                                    className="flex-1 input-base text-xs py-1.5"
                                                />
                                                {exp.bullets.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBullet(exp.id, bIdx)}
                                                        className="p-1.5 text-[#050315]/40 hover:text-red-500 shrink-0 cursor-pointer"
                                                    >
                                                        <XIcon size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills & Tools */}
                <div className="space-y-3 pt-2 border-t border-[#dedcff]/70">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2f27ce]">
                        4. Skills & Stacks (Comma-separated)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="label-base">Technical Skills & Languages</label>
                            <input
                                type="text"
                                value={skillsText}
                                onChange={e => handleSkillsChange(e.target.value)}
                                placeholder="e.g. TypeScript, React, Python, PostgreSQL, REST APIs"
                                className="input-base text-xs"
                            />
                        </div>
                        <div>
                            <label className="label-base">Tools, Platforms & Frameworks</label>
                            <input
                                type="text"
                                value={toolsText}
                                onChange={e => handleToolsChange(e.target.value)}
                                placeholder="e.g. AWS, Docker, Git, Next.js, Kubernetes, Jira"
                                className="input-base text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Education & Certifications */}
                <div className="space-y-3 pt-2 border-t border-[#dedcff]/70">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2f27ce]">
                            5. Education & Certifications
                        </h4>
                        <button
                            type="button"
                            onClick={addEducation}
                            className="text-xs font-bold text-[#2f27ce] hover:underline cursor-pointer"
                        >
                            + Add Education
                        </button>
                    </div>

                    <div className="space-y-2">
                        {resume.education.map((edu) => (
                            <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={e => {
                                        const val = e.target.value
                                        setResume(r => ({
                                            ...r,
                                            education: r.education.map(item => item.id === edu.id ? { ...item, degree: val } : item)
                                        }))
                                    }}
                                    placeholder="Degree (e.g. B.S. Computer Science)"
                                    className="input-base text-xs"
                                />
                                <input
                                    type="text"
                                    value={edu.school}
                                    onChange={e => {
                                        const val = e.target.value
                                        setResume(r => ({
                                            ...r,
                                            education: r.education.map(item => item.id === edu.id ? { ...item, school: val } : item)
                                        }))
                                    }}
                                    placeholder="University / School"
                                    className="input-base text-xs"
                                />
                                <div className="flex items-center gap-1.5">
                                    <input
                                        type="text"
                                        value={edu.graduationYear}
                                        onChange={e => {
                                            const val = e.target.value
                                            setResume(r => ({
                                                ...r,
                                                education: r.education.map(item => item.id === edu.id ? { ...item, graduationYear: val } : item)
                                            }))
                                        }}
                                        placeholder="Year (e.g. 2024)"
                                        className="input-base text-xs"
                                    />
                                    {resume.education.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeEducation(edu.id)}
                                            className="text-red-500 hover:text-red-700 text-xs px-1 cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <label className="label-base">Certifications (One per line)</label>
                        <textarea
                            rows={2}
                            value={certsText}
                            onChange={e => handleCertsChange(e.target.value)}
                            placeholder="AWS Certified Solutions Architect&#10;Certified Scrum Master (CSM)"
                            className="input-base text-xs"
                        />
                    </div>
                </div>

                {/* Primary Button */}
                <button
                    type="button"
                    onClick={() => {
                        setShowPreview(true)
                        setTimeout(() => {
                            const sheet = document.getElementById('ats-resume-print-sheet')
                            if (sheet) sheet.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }, 100)
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2f27ce] to-[#433bff] hover:from-[#231c9e] hover:to-[#2f27ce] text-[#fbfbfe] font-extrabold text-sm sm:text-base shadow-lg shadow-[#2f27ce]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                >
                    <FileTextIcon size={20} />
                    <span>Generate & View Professional Resume</span>
                </button>
            </div>

            {/* ── 3. DOWNLOAD & PRINT ACTIONS BAR + RESUME DOCUMENT ────── */}
            {showPreview && (
                <div className="space-y-6 pt-4 border-t border-[#dedcff]">
                    {/* Download & Print Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white border-2 border-[#dedcff] shadow-sm">
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="px-4 py-2.5 rounded-xl bg-[#2f27ce] hover:bg-[#433bff] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                            >
                                <PrinterIcon size={14} />
                                <span>{downloadStatus === 'print' ? 'Opening Dialog...' : 'Print / Save Vector PDF'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleDownloadDoc}
                                className="px-4 py-2.5 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#050315] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                            >
                                <DownloadIcon size={14} />
                                <span>{downloadStatus === 'doc' ? '✓ Downloaded Word' : 'Word (.doc)'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleDownloadTxt}
                                className="px-4 py-2.5 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#050315] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                            >
                                <FileTextIcon size={14} />
                                <span>{downloadStatus === 'txt' ? '✓ Downloaded Text' : 'Text (.txt)'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleCopyText}
                                className="px-4 py-2.5 rounded-xl bg-white border border-[#dedcff] hover:border-[#2f27ce] text-[#050315] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                            >
                                <CopyIcon size={14} />
                                <span>{downloadStatus === 'copy' ? '✓ Copied to Clipboard' : 'Copy All Text'}</span>
                            </button>
                        </div>

                        {/* Font Selector */}
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="font-bold text-[#050315]/70">Font:</span>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as TypographyTheme)}
                                className="px-2.5 py-1.5 rounded-xl border border-[#dedcff] bg-white text-xs font-medium outline-none cursor-pointer"
                            >
                                <option value="calibri">Calibri</option>
                                <option value="times">Times New Roman</option>
                                <option value="georgia">Georgia</option>
                                <option value="arial">Arial</option>
                            </select>
                        </div>
                    </div>

                    {/* Clean Single-Column Professional Resume Sheet */}
                    <div
                        id="ats-resume-print-sheet"
                        className={`w-full bg-white text-[#111111] p-8 sm:p-12 rounded-3xl border-2 border-[#dedcff] shadow-md space-y-6 ${fontClass}`}
                        style={{ minHeight: '750px' }}
                    >
                        {/* Header: Name, Title, Contact */}
                        <div className="text-center border-b border-[#222222] pb-4 space-y-1">
                            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#000000]">
                                {resume.contact.fullName || 'CANDIDATE NAME'}
                            </h1>
                            <div className="text-sm font-semibold text-[#333333]">
                                {resume.contact.headline || 'Professional Headline'}
                            </div>
                            <div className="text-xs text-[#444444] pt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                                {resume.contact.location && <span>{resume.contact.location}</span>}
                                {resume.contact.location && resume.contact.phone && <span>•</span>}
                                {resume.contact.phone && <span>{resume.contact.phone}</span>}
                                {resume.contact.email && <span>•</span>}
                                {resume.contact.email && <span>{resume.contact.email}</span>}
                                {resume.contact.linkedinUrl && <span>•</span>}
                                {resume.contact.linkedinUrl && <span>{resume.contact.linkedinUrl.replace(/^https?:\/\//, '')}</span>}
                            </div>
                        </div>

                        {/* Professional Summary */}
                        {resume.summary && (
                            <div className="space-y-1.5">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#000000] border-b border-[#333333] pb-0.5">
                                    Professional Summary
                                </h2>
                                <p className="text-xs text-[#222222] leading-relaxed pt-0.5">
                                    {resume.summary}
                                </p>
                            </div>
                        )}

                        {/* Skills & Technical Competencies */}
                        {(resume.skills.technical.length > 0 || resume.skills.frameworksAndTools.length > 0) && (
                            <div className="space-y-1.5">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#000000] border-b border-[#333333] pb-0.5">
                                    Skills & Technical Competencies
                                </h2>
                                <div className="text-xs text-[#222222] space-y-1 pt-0.5">
                                    {resume.skills.technical.length > 0 && (
                                        <p>
                                            <strong className="font-semibold text-[#000000]">Technical Skills: </strong>
                                            {resume.skills.technical.join(', ')}
                                        </p>
                                    )}
                                    {resume.skills.frameworksAndTools.length > 0 && (
                                        <p>
                                            <strong className="font-semibold text-[#000000]">Tools & Platforms: </strong>
                                            {resume.skills.frameworksAndTools.join(', ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Work Experience */}
                        {resume.experience.filter(e => e.title || e.company).length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#000000] border-b border-[#333333] pb-0.5">
                                    Work Experience
                                </h2>
                                <div className="space-y-4">
                                    {resume.experience.filter(e => e.title || e.company).map((exp) => (
                                        <div key={exp.id} className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-[#000000]">
                                                    {exp.title} {exp.company ? `| ${exp.company}` : ''}
                                                </span>
                                                <span className="font-medium text-[#444444]">
                                                    {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}
                                                </span>
                                            </div>
                                            {exp.location && (
                                                <div className="text-[11px] text-[#555555] italic">
                                                    {exp.location}
                                                </div>
                                            )}
                                            <ul className="list-disc pl-4 space-y-1 text-xs text-[#222222]">
                                                {exp.bullets.filter(Boolean).map((b, idx) => (
                                                    <li key={idx} className="leading-relaxed">
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {resume.education.filter(e => e.degree || e.school).length > 0 && (
                            <div className="space-y-2">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#000000] border-b border-[#333333] pb-0.5">
                                    Education
                                </h2>
                                <div className="space-y-1.5">
                                    {resume.education.filter(e => e.degree || e.school).map((edu) => (
                                        <div key={edu.id} className="flex items-center justify-between text-xs">
                                            <span className="font-bold text-[#000000]">
                                                {edu.degree} {edu.school ? `| ${edu.school}` : ''}
                                            </span>
                                            <span className="font-medium text-[#444444]">
                                                {edu.graduationYear}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {resume.certifications.length > 0 && (
                            <div className="space-y-1.5">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-[#000000] border-b border-[#333333] pb-0.5">
                                    Certifications
                                </h2>
                                <ul className="list-disc pl-4 space-y-0.5 text-xs text-[#222222]">
                                    {resume.certifications.map((c, idx) => (
                                        <li key={idx}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
