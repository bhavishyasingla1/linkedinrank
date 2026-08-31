'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const LoadingFallback = () => (
    <div className="flex items-center justify-center p-12 text-[#2f27ce]">
        <div className="w-8 h-8 border-3 border-[#2f27ce] border-t-transparent rounded-full animate-spin" />
    </div>
)

const HeadlineGeneratorTool = dynamic(() => import('@/components/tools/HeadlineGenerator'), { loading: LoadingFallback, ssr: false })
const AboutGeneratorTool = dynamic(() => import('@/components/tools/AboutGenerator'), { loading: LoadingFallback, ssr: false })
const BulletImproverV2 = dynamic(() => import('@/components/tools/BulletImproverV2'), { loading: LoadingFallback, ssr: false })
const ProfileRingCreator = dynamic(() => import('@/components/tools/ProfileRingCreator'), { loading: LoadingFallback, ssr: false })
const SEOCheckerTool = dynamic(() => import('@/components/tools/SEOChecker'), { loading: LoadingFallback, ssr: false })
const PostIdeaGenerator = dynamic(() => import('@/components/tools/PostIdeaGenerator'), { loading: LoadingFallback, ssr: false })
const StoryToPost = dynamic(() => import('@/components/tools/StoryToPost'), { loading: LoadingFallback, ssr: false })
const PostHookGeneratorTool = dynamic(() => import('@/components/tools/PostHookGenerator'), { loading: LoadingFallback, ssr: false })
const ContentPillarPlanner = dynamic(() => import('@/components/tools/ContentPillarPlanner'), { loading: LoadingFallback, ssr: false })
const CommentGenerator = dynamic(() => import('@/components/tools/CommentGenerator'), { loading: LoadingFallback, ssr: false })
const ConnectionMessageGenerator = dynamic(() => import('@/components/tools/ConnectionMessageGenerator'), { loading: LoadingFallback, ssr: false })
const QRCodeGeneratorTool = dynamic(() => import('@/components/tools/QRCodeGenerator'), { loading: LoadingFallback, ssr: false })
const ATSResumeMaker = dynamic(() => import('@/components/tools/ATSResumeMaker'), { loading: LoadingFallback, ssr: false })

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    headline: HeadlineGeneratorTool,
    about: AboutGeneratorTool,
    bullets: BulletImproverV2,
    ring: ProfileRingCreator,
    seo: SEOCheckerTool,
    postideas: PostIdeaGenerator,
    storytopost: StoryToPost,
    hooks: PostHookGeneratorTool,
    pillars: ContentPillarPlanner,
    comments: CommentGenerator,
    messages: ConnectionMessageGenerator,
    qrcode: QRCodeGeneratorTool,
    atsresume: ATSResumeMaker,
}

export default function ToolPageClient({ toolId }: { toolId: string }) {
    const Component = TOOL_COMPONENTS[toolId]
    if (!Component) return <p className="text-sm text-red-500">Tool not found</p>
    return <Component />
}
